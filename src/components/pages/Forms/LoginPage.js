import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../../styles/Form.scss";
import FormInput from "./Fields/FormInput";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/userActions";

function LoginPage({ props, history, location }) {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userInfo } = userLogin;
	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		document.title = "Login";
		if (userInfo) {
			history.goBack();
		}
	}, [history, userInfo]);

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email format").required("Required"),
		password: Yup.string().required("Required"),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = ({ email, password }) => {
		dispatch(login(email, password));
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
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
					{error && <h1 className="error">{error}</h1>}
					{loading && <div className="loader"></div>}
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
