import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { UserContext } from "../UserContext";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, setUser } = useContext(UserContext);

	const registerUser = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("/register", {
				name,
				email,
				password,
			});
			if (data === "already registered") {
				return alert("This e-mail address is already registered");
			}
			alert("Registration successful, you can login now!");
			<Navigate to={<LoginPage />} />;
		} catch (error) {
			console.log(error);
			alert("Registration failed. Please try again");
		}
	};

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto" onSubmit={registerUser}>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
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
					<button className="primary">Register</button>
					<div className="text-center py-2 text-gray-500">
						Already have an account?{" "}
						<Link className="underline text-black" to={"/login"}>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
