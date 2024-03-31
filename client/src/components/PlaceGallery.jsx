import { useState } from "react";

const PlaceGallery = ({ place }) => {
	const [showAllPhotos, setShowAllPhotos] = useState(false);
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

	if (showAllPhotos) {
		return (
			<div className="absolute inset-0 bg-gray-100 text-black min-h-screen mt-16">
				<div className="bg-gray-100 p-8 grid gap-4">
					<div>
						<h2 className="text-3xl mr-36">{place.title}</h2>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="fixed right-12 top-24 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-gray-500 bg-white text-black"
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
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
							Close
						</button>
					</div>
					{place?.photos?.length > 0 &&
						place.photos.map((photo) => (
							<div className="flex justify-center" key={photo}>
								<img
									className=""
									src={`${VITE_BASE_URL}/uploads/` + photo}
									alt=""
								/>
							</div>
						))}
				</div>
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden w-full h-auto">
				<div>
					{place.photos?.[0] && (
						<div className="overflow-hidden">
							<img
								onClick={() => setShowAllPhotos(true)}
								className="cursor-pointer aspect-square object-cover transition-all hover:opacity-80 hover:scale-105 duration-150"
								src={`${VITE_BASE_URL}/uploads/` + place.photos[0]}
								alt=""
							/>
						</div>
					)}
				</div>
				<div className="grid">
					{place.photos?.[1] && (
						<div className="overflow-hidden">
							<img
								onClick={() => setShowAllPhotos(true)}
								className="cursor-pointer aspect-square object-cover transition-all hover:opacity-80 hover:scale-105 duration-150"
								src={`${VITE_BASE_URL}/uploads/` + place.photos[1]}
								alt=""
							/>
						</div>
					)}
					<div className="overflow-hidden">
						{place.photos?.[2] && (
							<img
								onClick={() => setShowAllPhotos(true)}
								className="cursor-pointer aspect-square object-cover transition-all hover:opacity-80 hover:scale-105 duration-150 hover:translate-y-2 relative top-2"
								src={`${VITE_BASE_URL}/uploads/` + place.photos[2]}
								alt=""
							/>
						)}
					</div>
				</div>
			</div>
			<button
				onClick={() => setShowAllPhotos(true)}
				className="absolute bottom-2 right-2 py-2 px-3 flex gap-1 rounded-lg bg-white shadow-md shadow-gray-500"
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
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
				Show all photos
			</button>
		</div>
	);
};

export default PlaceGallery;
