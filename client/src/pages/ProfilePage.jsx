import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
	const [redirect, setRedirect] = useState(null);
	const { user, setUser, ready } = useContext(UserContext);
	let { subpage } = useParams();

	const logout = async () => {
		await axios.post("/logout");
		setRedirect("/");
		setUser(null);
	};

	if (!ready) {
		return "Loading...";
	}

	if (ready && !user && !redirect) {
		return <Navigate to={"/login"} />;
	}

	//this will correspond to the case of my profile tab since the param for my profile is undefined
	if (subpage === undefined) {
		subpage = "profile";
	}

	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return (
		<div>
			<AccountNav />
			{subpage === "profile" && (
				<div className="text-center max-w-lg mx-auto">
					Logged in as {user.name} ({user.email}) <br />
					<button onClick={logout} className="primary max-w-sm mt-2">
						Logout
					</button>
				</div>
			)}
			{subpage === "places" && <PlacesPage />}
		</div>
	);
};

export default ProfilePage;
