import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import "../../../styles/Form.scss";
import FormInput from "./Fields/FormInput";
import Header from "../../Header/Header";
import {
	getUserDetails,
	updateUserProfile,
} from "../../../actions/userActions";

const ProfilePage = ({ props, history }) => {
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

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
	const { register, handleSubmit, errors, setValue } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useDispatch();
	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
			} else {
				setValue("fullname", user.name, { shouldDirty: true });
				setValue("email", user.email, { shouldDirty: true });
			}
		}
	}, [history, dispatch, userInfo, user]);

	const onSubmit = ({ fullname, confirmPassword, email, password }) => {
		// console.log(fullname, confirmPassword, email, password);
		dispatch(updateUserProfile({ id: user._id, fullname, email, password }));
	};

	return (
		<>
			<Header />
			<div className="formContainer form">
				<form onSubmit={handleSubmit(onSubmit)}>
					{error && <h1 className="error">{error}</h1>}
					{success && <h1 className="success">Profile Updated</h1>}
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
					<button type="submit">Update</button>
				</form>
			</div>
		</>
	);
};

export default ProfilePage;
