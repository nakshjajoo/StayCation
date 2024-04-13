import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import Container from "../Container";

const Navbar = () => {
	return (
		<div className="fixed top-0 w-full bg-white z-10 shadow-sm left-0 right-0 mb-10">
			<div className="py-4 border-b-1">
				<Container>
					<header className="z-10 flex justify-between">
						<Link to={"/"} className="flex items-center gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8 -rotate-90"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
								/>
							</svg>
							<span className="font-bold text-xl">staycation</span>
						</Link>
						<div className="flex justify-center items-center">
							<UserMenu />
						</div>
					</header>
				</Container>
			</div>
		</div>
	);
};

export default Navbar;
