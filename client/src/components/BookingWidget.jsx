import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const BookingWidget = ({ place }) => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [daysBetween, setDaysBetween] = useState(0);
	const [numberofGuests, setNumberofGuests] = useState(1);
	const [amountBase, setAmountBase] = useState(0);
	const [amount, setAmount] = useState(0);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [redirect, setRedirect] = useState("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user]);

	const minGuests = 1;
	const currentDate = new Date().toISOString().split("T")[0];

	const formatCurrency = new Intl.NumberFormat("en-us");

	const bookThisPlace = async () => {
		if (!user) {
			return alert("You need to login to book places!");
		}
		const response = await axios.post("/bookings", {
			user,
			checkIn,
			checkOut,
			numberofGuests,
			name,
			phone,
			place: place._id,
			price: amount,
		});
		const bookingId = response.data._id;
		setRedirect(`/account/bookings/${bookingId}`);
	};

	useEffect(() => {
		if (checkIn && checkOut) {
			const start = new Date(checkIn);
			const end = new Date(checkOut);

			// Calculate the difference in milliseconds
			const diff = end - start;

			// Convert milliseconds to days
			const diffDays = diff / (1000 * 60 * 60 * 24);
			setDaysBetween(diffDays);

			setAmountBase((place.price * diffDays).toFixed(2));
			setAmount((amountBase * 1.15).toFixed(2));
		}
	}, [checkIn, checkOut]);

	useEffect(() => {
		setAmount((amountBase * 1.15).toFixed(2));
	}, [amountBase]);

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div className="border border-gray-200 shadow-lg p-4 rounded-2xl">
			<div className="pl-2 pb-3">
				<span className="font-semibold text-3xl">
					${formatCurrency.format(place.price)}
				</span>{" "}
				/night
			</div>
			<div className="border rounded-2xl">
				<div className="flex border-b">
					<div className="border-r py-3 px-4 flex-grow">
						<label className="font-semibold">CHECK IN </label>
						<br />
						<input
							required
							type="date"
							min={currentDate}
							value={checkIn}
							onChange={(e) => setCheckIn(e.target.value)}
						/>
					</div>
					<div className="py-3 px-4 flex-grow">
						<label className="font-semibold">CHECK OUT </label>
						<br />
						<input
							required
							type="date"
							min={checkIn || currentDate}
							value={checkOut}
							onChange={(e) => setCheckOut(e.target.value)}
						/>
					</div>
				</div>
				<div className="py-3 px-4 flex-grow">
					<label className="font-semibold">GUESTS </label>
					<br />
					<input
						required
						min={minGuests}
						max={place.maxGuests}
						type="number"
						value={numberofGuests}
						onChange={(e) => setNumberofGuests(e.target.value)}
					/>
				</div>
				{daysBetween > 0 && (
					<div className="grid grid-cols-1">
						<div className="px-4 flex-grow">
							<label className="font-semibold">YOUR FULL NAME</label>
							<br />
							<input
								required
								type="text"
								placeholder="Name for booking"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="px-4 flex-grow">
							<label className="font-semibold text-sm">
								YOUR PHONE NUMBER(include country code)
							</label>
							<br />
							<input
								required
								type="tel"
								placeholder="Phone"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
					</div>
				)}
			</div>
			<button className="primary mt-4" onClick={bookThisPlace}>
				Reserve
			</button>
			<div className="text-center text-sm mt-2 text-gray-600">
				You won't be charged yet
			</div>
			{checkIn && checkOut && daysBetween > 0 && (
				<div className="grid grid-cols-1 gap-4 mt-3">
					<div className="flex">
						<div className="flex-grow text-left underline">
							${formatCurrency.format(place.price)} X {daysBetween} nights{" "}
						</div>
						<div className="flex-grow text-right">
							${formatCurrency.format(amountBase)}
						</div>
					</div>
					<div className="flex">
						<div className="flex-grow text-left underline">
							Staycation Service Fee
						</div>
						<div className="flex-grow text-right">
							${formatCurrency.format(amountBase * 0.15)}
						</div>
					</div>
					<div className="flex border-t pt-3">
						<div className="flex-grow text-left font-semibold text-lg">
							Total:{" "}
						</div>
						<div className="flex-grow text-right">
							${formatCurrency.format(amount)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BookingWidget;
