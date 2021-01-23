import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import "./Form.scss";
import FormikControl from "./Fields/FormikControl";
import Header from "../../components/Header/Header";

function LoginPage(props) {
	useEffect(() => {
		document.title = "Login";
	}, []);

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email format").required("Required"),
		password: Yup.string().required("Required"),
	});

	const onSubmit = async (values, { setFieldError }) => {
		console.log(values);
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
								<button
									type="submit"
									disabled={!formik.dirty || !formik.isValid}
								>
									Login
								</button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
}

export default LoginPage;
