import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { setUser } = useContext(UserContext);

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("/login", {
				email,
				password,
			});
			if (data === "not found") {
				return alert(
					"Could not find user with the specified e-mail and password"
				);
			}
			setUser(data);
			setRedirect(true);
		} catch (error) {
			console.log(error);
			alert("Login failed");
		}
	};

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form
					className="max-w-md mx-auto"
					onSubmit={(e) => handleLoginSubmit(e)}
				>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="primary">Login</button>
					<div className="text-center py-2 text-gray-500">
						Don't have an account?{" "}
						<Link className="underline text-black" to={"/register"}>
							Register Now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
