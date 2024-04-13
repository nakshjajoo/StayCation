import { useContext, useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Link, Navigate } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import { UserContext } from "../UserContext";

const BookingsPage = () => {
	const [bookings, setBookings] = useState([]);
	const { user, setUser } = useContext(UserContext);

	if (!user) {
		return <Navigate to={"/"} />;
	}

	useEffect(() => {
		axios.get("/bookings").then((response) => {
			setBookings(response.data);
		});
	}, []);

	return (
		<div className="mt-12">
			<AccountNav />
			<div>
				{bookings?.length > 0 &&
					bookings.map((booking) => (
						<Link
							to={`/account/bookings/${booking._id}`}
							className="grid grid-cols-1 mb-3"
							key={booking._id}
						>
							<div className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden">
								<div className="w-48 h-48">
									<PlaceImg place={booking.place} className={"h-48"} />
								</div>
								<div className="py-3 pr-3 grow">
									<h2 className="text-2xl font-semibold">
										{booking.place.title}
									</h2>
									<h3 className="text-lg font-medium">
										{booking.place.address}
									</h3>
									<BookingDates booking={booking} />
									<div className="flex gap-2">
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
												d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
											/>
										</svg>
										<div className="text-gray-700">
											Total price: ${booking.price}
										</div>
									</div>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default BookingsPage;
