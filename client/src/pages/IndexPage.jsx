import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
	const [places, setPlaces] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get('/places').then((response) => {
			setPlaces(response.data);
			setLoading(false);
		}).catch(error => {
			console.error("Error fetching places" + error);
			setLoading(false);
		});
	}, []);

	const formatCurrency = new Intl.NumberFormat("en-us");

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{places.length > 0 &&
				places.map((place) => (
					<Link to={"/place/" + place._id} key={place._id}>
						<div className="bg-gray-500 mb-2 rounded-2xl flex">
							{place.photos?.[0] && (
								<img
									className="rounded-2xl object-cover aspect-square"
									src={"http://localhost:4000/uploads/" + place.photos?.[0]}
									alt="img"
								/>
							)}
						</div>
						<h2 className="font-bold ">{place.address}</h2>
						<h3 className="text-sm text-gray-500">{place.title}</h3>
						<div className="mt-1">
							<span className="font-bold">
								${formatCurrency.format(place.price)}
							</span>
							/night
						</div>
					</Link>
				))}
		</div>
	);
};

export default IndexPage;

// import axios from "axios"
// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom";

// const IndexPage = () => {
//   const [places, setPlaces] = useState([]);

//   useEffect(() => {
//     axios.get('/places').then(response => {
//       setPlaces(response.data);
//     })
//   }, [])

//   const formatCurrency = new Intl.NumberFormat("en-us");

//   return (
//     <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       {places.length > 0 && places.map(place => (
//         <Link to={'/place/' + place._id} key={place._id}>
//           <div className="bg-gray-500 mb-2 rounded-2xl flex">
//             {place.photos?.[0] && (
//               <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="img" />
//             )}
//           </div>
//           <h2 className="font-bold ">{place.address}</h2>
//           <h3 className="text-sm text-gray-500">{place.title}</h3>
//           <div className="mt-1">
//             <span className="font-bold">${formatCurrency.format(place.price)}</span>/night
//           </div>
//         </Link>
//       ))}
//     </div>
//   )
// }

// export default IndexPage
