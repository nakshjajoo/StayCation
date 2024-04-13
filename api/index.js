const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'bc2gfhjnd10n289bf45fv8ydhiulqhdgkyfwt';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
	origin: 'https://staycation-alpha.vercel.app',
	credentials: true,
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/', (req, res) => {
  res.json('test ok')
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
		const findUser = await User.findOne({email});
		if (findUser) {
			return res.json('already registered');
		}
		const userDoc = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptSalt),
		});
		res.json(userDoc);
	} catch (error) {
		res.status(422).json(error)
	}
});

app.post('/login', async (req,res) => {
	const {email,password} = req.body;
	const userDoc = await User.findOne({email});
	if (userDoc) {
		const passOk = bcrypt.compareSync(password, userDoc.password);
		if (passOk) {
			jwt.sign({
				email:userDoc.email,
				id:userDoc._id
			}, jwtSecret, {}, (err,token) => {
				if (err) throw err;
				res.cookie('token', token, {
					httpOnly: true,
					secure: true,  // Important for cross-origin and HTTPS
					sameSite: 'None'  // Necessary for cross-origin
				}).json(userDoc);
			});
		} else {
			alert("Wrong password, please try again!");
			res.status(422).json('password not ok');
		}
	} else {
		alert("User not found. Please register!");
		res.json('not found');
	}
});  

app.get('/profile', (req, res) => {
	const {token} = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async(err, userData) => {
			if (err) {
				console.log(err);
				throw err;
			} 
			const {name, email, _id} = await User.findById(userData.id);
			res.json({name, email, _id});
		});
	} else {
		res.json(null);
	}
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
	const {link} = req.body;
	const newName = 'photo' + Date.now() + '.jpg'
	const options = {
		url: link,
		dest: __dirname + '/uploads/' + newName,
	};
	await imageDownloader.image(options);
	res.json(newName);
});

const photosMiddleware = multer({dest: 'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
	const uploadedFiles = [];
	for (let i = 0; i < req.files.length; i++) {
		const {path, originalname} = req.files[i];
		const parts = originalname.split('.');
		const extension = parts[parts.length - 1];
		const newPath = path + '.' + extension;
		fs.renameSync(path, newPath);
		uploadedFiles.push(newPath.replace('uploads/', ''));
	} 
	res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
	const {token} = req.cookies;
	const {
		title, address, addedPhotos, 
		description, perks, extraInfo,
		checkIn, checkOut, maxGuests, price
	} = req.body;
	jwt.verify(token, jwtSecret, {}, async(err, userData) => {
		if (err) throw err;
		const placeDoc = await Place.create({
				owner: userData.id,
				title, 
				address, 
				photos: addedPhotos, 
				description, 
				perks, 
				extraInfo,
				checkIn, 
				checkOut, 
				maxGuests,
				price
		});
		res.json(placeDoc);
	});
});

app.get('/user-places', (req, res) => {
	const {token} = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) {
				console.log(err);
				throw err;
			}
			const {id} = userData;
			if (!id) {
				res.json(null);
			}
			res.json( await Place.find({owner: id}) );
		});
	} else {
		res.json(null);
	}
	
});

app.get('/places/:id', async (req, res) => {
	const {id} = req.params;
	res.json(await Place.findById(id));
});

app.put('/places/', async (req, res) => {
    const {token} = req.cookies;
    const {
			id,
			title, address, addedPhotos, 
			description, perks, extraInfo,
			checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err;
			const placeDoc = await Place.findById(id);
			if (userData.id === placeDoc.owner.toString()) {
				placeDoc.set({
						title, 
						address, 
						photos: addedPhotos, 
						description, 
						perks, 
						extraInfo,
						checkIn, 
						checkOut, 
						maxGuests,
						price
				});
				await placeDoc.save();
				res.json('ok');
			}
    });
});

app.get('/places', async (req, res) => {
    try {
        const places = await Place.find();
        console.log("Places: " + places);
        res.json(places);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
		if (!req.cookies.token) {
			return reject(new Error('No token found'));
		}
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.post('/bookings', async (req, res) => {    
	const userData = await getUserDataFromReq(req);
  const {
    place,checkIn,checkOut,numberOfGuests,name,phone,price,
  } = req.body;
  Booking.create({
    place, 
		checkIn, 
		checkOut, 
		numberOfGuests, 
		name, 
		phone, 
		price, 
		user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});

app.get('/bookings', async (req, res) => {
	const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place') );
})

app.get('/*', (req, res) => {
  res.status(404).json("Could not find the page you are looking for");
})

app.listen(process.env.PORT || 4000);