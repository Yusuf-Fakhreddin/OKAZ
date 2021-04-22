import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../actions/userActions";

import "../../../styles/Form.scss";
import FormInput from "./Fields/FormInput";
import Header from "../../Header/Header";

function RegisterationPage({ props, history, location }) {
	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);

	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		document.title = "Register";
		if (userInfo) {
			// history.push(redirect);
			history.goBack();
		}
	}, [history, userInfo, redirect]);

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
		email: Yup.string().email("Invalid email format").required("Required"),
		phoneNumber: Yup.number().test(
			"len",
			"Please enter a valid phone number of 11 digits",
			(val) => val.toString().length === 11
		),
		password: Yup.string().required("Required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), ""], "Passwords must match")
			.required("Required"),
	});

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(validationSchema),
	});
	const onSubmit = ({ name, email, password, phoneNumber }) => {
		console.log("Submitting");
		dispatch(registerUser(name, email, password, phoneNumber));
	};
	return (
		<>
			<Header />
			<div className="formContainer form">
				<div className="haveAccount">
					<h2>Already have an account ?</h2>
					<NavLink
						to={redirect ? `/login?redirect=${redirect}` : "/login"}
						activeClassName="active"
					>
						<button type="submit">Login</button>
					</NavLink>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					{error && <h1 className="error">{error}</h1>}
					<FormInput
						register={register}
						type="text"
						name="name"
						label="Full Name"
						id="name"
						error={errors.name}
					/>

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
						type="number"
						name="phoneNumber"
						label="Phone Number"
						onWheel={(e) => e.currentTarget.blur()}
						id="phoneNumber"
						error={errors.phoneNumber}
					/>

					<FormInput
						register={register}
						type="password"
						name="password"
						label="Password"
						id="password"
						error={errors.password}
					/>
					<FormInput
						register={register}
						type="password"
						name="confirmPassword"
						label="Confirm Password"
						id="confirmPassword"
						error={errors.confirmPassword}
					/>
					<button type="submit">Register</button>
				</form>
			</div>
		</>
	);
}

export default RegisterationPage;
