import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Form.scss";
import Header from "../../components/Header/Header";
import FormInput from "./Fields/FormInput";

function LoginPage(props) {
	useEffect(() => {
		document.title = "Login";
	}, []);

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email format").required("Required"),
		password: Yup.string().required("Required"),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = ({ email, password }) => {
		console.log(email, password);
	};
	return (
		<>
			<Header />
			<div className="formContainer form">
				<div className="haveAccount">
					<h2>Does not have an account ?</h2>
					<NavLink activeClassName="active" to="/register">
						<button type="submit">Sign up</button>
					</NavLink>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						register={register}
						type="email"
						name="email"
						label="Email"
						id="email"
						error={errors.email}
					/>
					<FormInput
						register={register}
						type="password"
						name="password"
						label="Password"
						id="password"
						error={errors.password}
					/>
					<button type="submit">Login</button>
				</form>
			</div>
		</>
	);
}

export default LoginPage;
