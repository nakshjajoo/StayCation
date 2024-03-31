import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const PlacesFormPage = () => {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [redirect, setRedirect] = useState(false);
	const [price, setPrice] = useState(0);

	const { user, setUser } = useContext(UserContext);

	if (!user) {
		return <Navigate to={"/"} />;
	}

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/places/" + id).then((response) => {
			const { data } = response;
			setTitle(data.title);
			setAddress(data.address);
			setAddedPhotos(data.photos);
			setDescription(data.description);
			setPerks(data.perks);
			setExtraInfo(data.extraInfo);
			setCheckIn(data.checkIn);
			setCheckOut(data.checkOut);
			setMaxGuests(data.maxGuests);
			setPrice(data.price);
		});
	}, [id]);

	const inputHeader = (text) => {
		return <h2 className="test-2xl mt-4">{text}</h2>;
	};
	const inputDescription = (text) => {
		return <p className="text-gray-500 text-sm">{text}</p>;
	};
	const preInput = (header, description) => {
		return (
			<>
				{inputHeader(header)}
				{inputDescription(description)}
			</>
		);
	};

	const savePlace = async (e) => {
		e.preventDefault();
		const placeData = {
			title,
			address,
			addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			price,
		};
		if (id) {
			//update
			await axios.put("/places", {
				id,
				...placeData,
			});
			setRedirect(true);
		} else {
			//new place
			await axios.post("/places", placeData);
			setRedirect(true);
		}
	};

	if (redirect) {
		return <Navigate to={"/account/places"} />;
	}

	return (
		<div className="mt-12">
			<AccountNav />
			<form onSubmit={savePlace}>
				{preInput("Title", "Name of your place, should be short and catchy!")}
				<input
					required
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
				/>

				{preInput(
					"Address",
					"Address to your place, which would help people to locate you easily!"
				)}
				<input
					required
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Address"
				/>

				{preInput("Photos", "Let travellers know what you are offering!")}
				<PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

				{preInput("About this place", "Describe your place to the travellers!")}
				<textarea
					className="h-64"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				{preInput("Perks", "Select all the perks you offer!")}
				<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
					<Perks selected={perks} onChange={setPerks} />
				</div>

				{preInput(
					"Check in time, check out time, and maximum number of guests",
					"Add information about the expected time for check in and check out, and the maximum number of guests allowed Remember to have some time window for cleaning the room between simultaneous bookings!"
				)}
				<div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-4">
					<div>
						<h3 className="mt-2 -mb-1">Check in time</h3>
						<input
							required
							type="text"
							value={checkIn}
							onChange={(e) => setCheckIn(e.target.value)}
							placeholder="14"
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Check out time</h3>
						<input
							required
							type="text"
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
							placeholder="11"
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Maximum number of guests</h3>
						<input
							required
							type="number"
							value={maxGuests}
							onChange={(e) => setMaxGuests(e.target.value)}
							placeholder="2"
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Price per night</h3>
						<input
							required
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							placeholder="2"
						/>
					</div>
				</div>

				{preInput(
					"Extra Information",
					"Anything else you might want the travellers to know about your property!"
				)}
				<textarea
					className="h-64"
					value={extraInfo}
					onChange={(e) => setExtraInfo(e.target.value)}
				/>

				<button className="primary my-4">Save and Submit</button>
			</form>
		</div>
	);
};

export default PlacesFormPage;
