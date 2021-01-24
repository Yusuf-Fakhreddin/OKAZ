import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "./Fields/FormikControl";
import Header from "../../components/Header/Header";
import "./Form.scss";

function RegisterationPage(props) {
	useEffect(() => {
		document.title = "Register";
	}, []);

	const initialValues = {
		fullname: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

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

	const onSubmit = async (values, { errors, setFieldError }) => {
		console.log(values);
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
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(formik) => {
						return (
							<Form autoComplete="off">
								<FormikControl
									control="input"
									type="text"
									label="Full Name"
									name="fullname"
								/>
								<FormikControl
									control="input"
									type="email"
									label="Email"
									name="email"
								/>
								<FormikControl
									control="input"
									type="password"
									label="Password"
									name="password"
								/>
								<FormikControl
									control="input"
									type="password"
									label="Confirm Password"
									name="confirmPassword"
								/>
								<button
									type="submit"
									disabled={!formik.dirty || !formik.isValid}
								>
									Sign Up
								</button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
}

export default RegisterationPage;
