import React, { useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Button, ProgressBar } from "react-materialize";

import FormInput from "./Fields/FormInput";
import Header from "../../Header/Header";
import { updateUserProfile } from "../../../actions/userActions";
import { useHistory } from "react-router-dom";
import { toastFailure, toastSuccess } from "../../Toast/MyToast";

const ProfilePage = ({ props }) => {
	const history = useHistory();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	let { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {
		userInfo: newUserInfo,
		success,
		loading: loadingUpdate,
		error: errorUpdate,
	} = userUpdateProfile;

	const validationSchema = Yup.object({
		fullname: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
		email: Yup.string().email("Invalid email format").required("Required"),
		password: Yup.string().required("Required"),
		phoneNumber: Yup.string()
			.required("Required")
			.matches(
				/^(01)[0-9]{9}$/,
				"Please enter a proper 11 digits number starts with 01 "
			),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), ""], "Passwords must match")
			.required("Required"),
	});
	const { register, handleSubmit, errors, setValue, getValues } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useDispatch();
	useEffect(() => {
		document.title = "Profile";
		console.log(userInfo);
		if (!userInfo) {
			history.push("/login");
		} else {
			// if (!user || !user.name || success) {
			// 	dispatch({ type: USER_UPDATE_PROFILE_RESET });
			// 	dispatch(getUserDetails(userInfo._id));
			// } else {
			setValue("fullname", userInfo.name);
			setValue("email", userInfo.email);
			setValue("phoneNumber", userInfo.phoneNumber);
			// }
		}
	}, [history, dispatch, userInfo, user]);

	const onSubmit = ({
		fullname,
		confirmPassword,
		email,
		password,
		phoneNumber,
	}) => {
		console.log({
			name: fullname,
			confirmPassword,
			email,
			password,
			phoneNumber,
		});
		dispatch(
			updateUserProfile({
				id: user._id,
				name: fullname,
				phoneNumber,
				email,
				password,
			})
		);
		if (errorUpdate) toastFailure(errorUpdate);
		else toastSuccess("Profile Updated Successfuly");
	};
	const values = getValues();

	useEffect(() => {
		console.log(errors);
		console.log(values);
	}, [values, errors]);

	return (
		<>
			<Header />
			<div className="section container">
				<h2>Your Profile infomation</h2>
				{loadingUpdate && <ProgressBar />}
				<div>
					{/* {error && <h4 className="red-text">{error}</h4>}
					{success && <h1 className="success">Profile Updated</h1>} */}
					{loading && <div className="loader"></div>}
					<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						<FormInput
							register={register}
							type="text"
							name="fullname"
							label="Full Name"
							id="fullname"
							error={errors.fullname}
							value={values.fullname}
						/>
						<FormInput
							register={register}
							type="email"
							name="email"
							label="Email"
							id="email"
							error={errors.email}
							value={values.email}
						/>
						<FormInput
							register={register}
							type="text"
							name="phoneNumber"
							label="Phone Number"
							id="phoneNumber"
							error={errors.phoneNumber}
							value={values.phoneNumber}
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
						<Button large node="button" waves="light" type="submit">
							Update
						</Button>{" "}
					</form>
				</div>
			</div>
		</>
	);
};

export default ProfilePage;
