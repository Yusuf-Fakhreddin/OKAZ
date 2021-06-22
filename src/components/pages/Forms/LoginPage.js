import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./Fields/FormInput";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/userActions";
import { Button, Divider } from "react-materialize";

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
			<div className="container section">
				<div className="section">
					<h5>You can create a new one</h5>
					<NavLink activeClassName="active" to="/register">
						<Button type="submit">Sign up</Button>
					</NavLink>
				</div>
				<Divider />
				<form
					autoComplete="off"
					className="section"
					onSubmit={handleSubmit(onSubmit)}
				>
					{error && <h3 className="error">{error}</h3>}
					{loading && <div className="loader"></div>}
					<h3>Already have an account ?</h3>
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
					<Button large type="submit">
						Login
					</Button>
				</form>
			</div>
		</>
	);
}

export default LoginPage;
