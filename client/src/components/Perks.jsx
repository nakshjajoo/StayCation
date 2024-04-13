const Perks = ({ selected, onChange }) => {
	const handleCbClick = (e) => {
		const { checked, name } = e.target;
		if (checked) {
			onChange([...selected, name]);
		} else {
			onChange([...selected.filter((selectedName) => selectedName !== name)]);
		}
	};

	return (
		<>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("wifi")}
					name="wifi"
					onChange={handleCbClick}
				/>
				<span>Wi-Fi</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("parking")}
					name="parking"
					onChange={handleCbClick}
				/>
				<span>Free Parking</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("tv")}
					name="tv"
					onChange={handleCbClick}
				/>
				<span>TV</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("pets")}
					name="pets"
					onChange={handleCbClick}
				/>
				<span>Pets allowed</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("kitchen")}
					name="kitchen"
					onChange={handleCbClick}
				/>
				<span>Kitchen and basic appliances</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("heatcool")}
					name="heatcool"
					onChange={handleCbClick}
				/>
				<span>Heating and cooling systems</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("outdoor")}
					name="outdoor"
					onChange={handleCbClick}
				/>
				<span>Outdoor furniture, dining area, BBQ, fire pit</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("bathtub")}
					name="bathtub"
					onChange={handleCbClick}
				/>
				<span>Bathtub</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("laundry")}
					name="laundry"
					onChange={handleCbClick}
				/>
				<span>Laundry</span>
			</label>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input
					type="checkbox"
					checked={selected.includes("recreation")}
					name="recreation"
					onChange={handleCbClick}
				/>
				<span>Recreational activities(Pool, Ping Pong, etc.)</span>
			</label>
		</>
	);
};

export default Perks;
