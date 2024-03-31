const PlaceImg = ({ place, index = 0, className = null }) => {
	if (!place.photos?.length) {
		return "";
	}
	if (!className) {
		className = "object-cover";
	} else {
		className += " object-cover";
	}
	return (
		<img
			className={className}
			src={`${import.meta.env.VITE_BASE_URL}/uploads/` + place.photos[index]}
			alt="img"
		/>
	);
};

export default PlaceImg;
