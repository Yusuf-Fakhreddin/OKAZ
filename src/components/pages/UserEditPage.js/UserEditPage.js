import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../../../actions/userActions";

import "../../../styles/Form.scss";
import FormInput from "../Forms/Fields/FormInput";
import Header from "../../Header/Header";
import { USER_UPDATE_RESET } from "../../../constants/userConstants";

function UserEditPage({ props, match, history }) {
	const userId = match.params.id;

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		console.log(user);
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push("/admin/userlist");
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setValue("fullname", user.name);
				setValue("email", user.email);
				setValue("isAdmin", user.isAdmin);
				setValue("phoneNumber", user.phoneNumber);
			}
		}
	}, [dispatch, userId, user]);

	const validationSchema = Yup.object({
		fullname: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
		email: Yup.string().email("Invalid email format").required("Required"),
	});

	const { register, handleSubmit, errors, setValue } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});
	const onSubmit = ({ fullname, email, isAdmin, phoneNumber }) => {
		dispatch(updateUser({ _id: userId, fullname, email, isAdmin }));
	};
	return (
		<>
			<Header />
			<div className="container">
				<h2>Edit User</h2>
			</div>
			<div className="formContainer form">
				{loadingUpdate && <div className="loader"></div>}
				{errorUpdate && <div className="error">{errorUpdate}</div>}
				<form onSubmit={handleSubmit(onSubmit)}>
					{error && <h1 className="error">{error}</h1>}
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
						type="number"
						name="phoneNumber"
						label="Phone Number"
						onWheel={(e) => e.currentTarget.blur()}
						id="phoneNumber"
						error={errors.phoneNumber}
					/>
					<br />
					<label htmlFor="isAdmin" style={{ marginRight: "5px" }}>
						Is Admin?
					</label>
					<input ref={register} type="checkbox" name="isAdmin" id="isAdmin" />
					<br />
					<button type="submit">Update</button>
				</form>
			</div>
		</>
	);
}

export default UserEditPage;
