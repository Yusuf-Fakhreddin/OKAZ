import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../components/Header/Header";
import "./Form.scss";
import FormInput from "./Fields/FormInput";

function RegisterationPage(props) {
	useEffect(() => {
		document.title = "Register";
	}, []);

	const validationSchema = Yup.object({
		fullname: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
		email: Yup.string().email("Invalid email format").required("Required"),
		password: Yup.string().required("Required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), ""], "Passwords must match")
			.required("Required"),
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
					<h2>Already have an account ?</h2>
					<NavLink to="/login" activeClassName="active">
						<button type="submit">Login</button>
					</NavLink>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						register={register}
						type="text"
						name="fullname"
						label="Full Name"
						id="fullname"
						error={errors.fullname}
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
				</form>
			</div>
		</>
	);
}

export default RegisterationPage;
