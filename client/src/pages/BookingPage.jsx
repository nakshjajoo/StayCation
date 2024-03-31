import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import { UserContext } from "../UserContext";

const BookingPage = () => {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);
	const { user, setUser } = useContext(UserContext);

	if (!user) {
		return <Navigate to={"/"} />;
	}

	useEffect(() => {
		if (id) {
			axios.get("/bookings").then((response) => {
				const foundBooking = response.data.find(({ _id }) => _id === id);
				if (foundBooking) {
					setBooking(foundBooking);
				}
			});
		}
	}, [id]);

	if (!booking) {
		return "Loading...";
	}

	return (
		<div className=" mt-20 mb-10">
			<h1 className="text-3xl">{booking.place.title}</h1>
			<AddressLink className="my-2 ">{booking.place.address}</AddressLink>
			<div className="bg-gray-200 p-4 mb-6 mt-2 rounded-2xl flex justify-between items-center">
				<div className="pl-4">
					<h2 className="text-xl mb-2 font-semibold">
						Your booking information
					</h2>
					<BookingDates booking={booking} />
				</div>
				<div className="p-4 bg-primary text-white rounded-2xl">
					<div>Total price</div>
					<div className="text-3xl">${booking.price}</div>
				</div>
			</div>
			<PlaceGallery place={booking.place} />
		</div>
	);
};

export default BookingPage;
