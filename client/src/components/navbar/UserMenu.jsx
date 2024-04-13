import { useCallback, useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import MenuItems from "./MenuItems";

const UserMenu = () => {
	const { user } = useContext(UserContext);
	const [isOpen, setIsOpen] = useState(false);
	// Ref to attach to the div
	const divRef = useRef(null);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	});

	useEffect(() => {
		function handleClickOutside(event) {
			if (divRef.current && !divRef.current.contains(event.target)) {
				setIsOpen(false); // Hide the div if the click is outside
			}
		}
		// Add when the component mounts
		document.addEventListener("mousedown", handleClickOutside);
		// Remove event listener on cleanup
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [divRef]);

	return (
		<div>
			<div
				onClick={toggleOpen}
				className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 cursor-pointer"
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
				<div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6 relative top-1"
					>
						<path
							fillRule="evenodd"
							d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				{!!user && <div>{user.name}</div>}
			</div>

			{isOpen && (
				<div
					ref={divRef}
					className="absolute rounded-xl shadow-md w-[15vw] bg-white overflow-hidden right-7 top-15 text-sm"
				>
					<div className="flex flex-col cursor-pointer">
						<>
							{!user && (
								<>
									<MenuItems to={"/login"} label={"Log in"} />
									<MenuItems to={"/register"} label="Sign up" />
								</>
							)}
							{user && (
								<>
									<MenuItems to={"/account/bookings"} label="My Bookings" />
									<MenuItems to={"account/places"} label="My accomodations" />
									<MenuItems to={"/"} label="Logout" />
								</>
							)}
						</>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
