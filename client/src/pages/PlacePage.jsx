import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import { UserContext } from "../UserContext";

const PlacePage = () => {
	const { id } = useParams();
	const [place, setPlace] = useState(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [copied, setCopied] = useState(false);
	const [showAllPhotos, setShowAllPhotos] = useState(false);
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		if (!id) {
			return;
		}

		axios.get(`/places/${id}`).then((response) => {
			setPlace(response.data);
		});
	}, [id]);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	let text = place?.description;
	let displayText = "";
	if (text && text.length < 600) {
		displayText = text;
	} else if (text) {
		displayText = isExpanded ? text : `${text.substring(0, 600)}...`;
	}

	const copyLink = async () => {
		await navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2500);
	};

	if (!place) return "";

	return (
		<div className="-mx-8 px-8 pt-8 mt-10">
			<h1 className="text-3xl">{place.title}</h1>
			<div>
				<div className="flex justify-between items-center">
					<AddressLink>{place.address}</AddressLink>
					<button
						className="flex gap-2 items-center cursor-pointer transition bg-white ease-in-out delay-100 -translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300 p-2 rounded-xl"
						onClick={copyLink}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-5 h-5"
						>
							<path
								fillRule="evenodd"
								d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
								clipRule="evenodd"
							/>
						</svg>
						Share
					</button>
				</div>
				{copied && (
					<div className="z-20 absolute right-0 mr-2 px-2 py-1 rounded-xl shadow-lg bg-gray-200 opacity-1 transition-opacity duration-150">
						Link copied to clipboard
					</div>
				)}
			</div>
			<PlaceGallery
				place={place}
				showAllPhotos={showAllPhotos}
				setShowAllPhotos={setShowAllPhotos}
			/>

			<div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
				<div>
					<div className="my-4">
						<h2 className="font-semibold text-2xl">About</h2>
						{displayText + " "}
						{text.length > 600 && (
							<button
								className="bg-white font-semibold underline"
								onClick={toggleExpanded}
							>
								{isExpanded ? "Show less" : "Show more"}
							</button>
						)}
					</div>
					<b className="underline">Check-in: </b> {place.checkIn}:00 <br />
					<b className="underline">Check-out: </b> {place.checkOut}:00 <br />
					<b className="underline">Maximum number of guests: </b>{" "}
					{place.maxGuests} <br />
					<h3 className="text-2xl mt-4 font-semibold">
						What this place offers{" "}
					</h3>
					<div className="grid grid-cols-2">
						{place.perks.map((perk) => (
							<div className="flex gap-2 text-lg" key={perk}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6"
								>
									<path
										fillRule="evenodd"
										d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
										clipRule="evenodd"
									/>
								</svg>
								<p>
									{perk.substring(0, 1).toUpperCase() +
										perk.substring(1, perk.length)}
								</p>
							</div>
						))}
					</div>
				</div>
				<div>
					<BookingWidget place={place} />
				</div>
			</div>
			<div className="mx-8 px-8 py-8 border-t">
				<div>
					<h2 className=" mb-2 text-xl font-semibold">Other things to note:</h2>
				</div>
				<div className="mb-4 mt-2 text-md text-gray-600 leading-5">
					{place.extraInfo}
				</div>
			</div>
		</div>
	);
};

export default PlacePage;
