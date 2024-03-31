import { Link, Navigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { UserContext } from "../UserContext";

const PlacesPage = () => {
	const [places, setPlaces] = useState([]);
	const { user, setUser } = useContext(UserContext);

	if (!user) {
		return <Navigate to={"/"} />;
	}

	useEffect(() => {
		axios.get("/user-places").then(({ data }) => {
			setPlaces(data);
		});
	}, []);

	return (
		<div className="mt-12">
			<AccountNav />
			<div className="text-center">
				<Link
					className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
					to={"/account/places/new"}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
					Add New Place
				</Link>
			</div>
			<div className="mt-4">
				{places.length > 0 &&
					places.map((place) => (
						<Link
							to={"/account/places/" + place._id}
							className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer mb-3"
							key={place._id}
						>
							<div className=" flex w-40 h-40 bg-gray-300 rounded-2xl grow shrink-0">
								<PlaceImg place={place} />
							</div>
							<div className="grow-0 shrink">
								<h2 className="text-xl ">{place.title}</h2>
								<p className="text-small mt-2">
									{place.description.length > 600 &&
										place.description.substring(0, 601) + "..."}
									{place.description.length <= 600 && place.description}
								</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default PlacesPage;
