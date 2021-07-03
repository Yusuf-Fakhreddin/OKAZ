import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../actions/userActions";
import { Button, Divider } from "react-materialize";

import FormInput from "./Fields/FormInput";
import Header from "../../Header/Header";

function RegisterationPage({ props, history, location }) {
	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userInfo } = userRegister;
	const { userInfo: LogInInfo } = userLogin;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		document.title = "Register";
		if (userInfo || LogInInfo) {
			// history.push(redirect);
			history.push("/");
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
		mode: "onBlur",

		resolver: yupResolver(validationSchema),
	});
	const onSubmit = ({ name, email, password, phoneNumber }) => {
		console.log("Submitting");
		dispatch(registerUser(name, email, password, phoneNumber));
	};
	return (
		<>
			<Header />
			<div className="container ">
				<div className="section">
					<h5>Already have an account ?</h5>
					<NavLink
						to={redirect ? `/login?redirect=${redirect}` : "/login"}
						activeClassName="active"
					>
						<Button type="submit">Login</Button>
					</NavLink>
				</div>
				<Divider />
				<form
					autoComplete="off"
					className="section"
					onSubmit={handleSubmit(onSubmit)}
				>
					{error && <h1 className="error">{error}</h1>}
					<h3>New Account</h3>
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
					<Button large type="submit">
						Register
					</Button>
				</form>
			</div>
		</>
	);
}

export default RegisterationPage;
