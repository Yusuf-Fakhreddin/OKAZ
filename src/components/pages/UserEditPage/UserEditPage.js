import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../../../actions/userActions";
import { Checkbox, Button } from "react-materialize";

import FormInput from "../Forms/Fields/FormInput";
import Header from "../../Header/Header";
import { USER_UPDATE_RESET } from "../../../constants/userConstants";

function UserEditPage({ props }) {
	let { id } = useParams();
	let history = useHistory();
	const userId = id;

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
				// setValue("isAdmin", user.isAdmin);
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

	const { register, handleSubmit, errors, setValue, getValues } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const [isAdmin, setAdmin] = useState(user.isAdmin);

	const onSubmit = ({ fullname, email, phoneNumber }) => {
		console.log({ fullname, email, isAdmin, phoneNumber });
		dispatch(updateUser({ _id: userId, name: fullname, email, isAdmin }));
	};
	const values = getValues();

	const handleCheckbox = (e) => {
		console.log(e.target.checked);
		setAdmin(e.target.checked);
	};

	return (
		<>
			<Header />
			<div className="container">
				<h2>Edit User</h2>
			</div>
			<div className="container">
				{(loadingUpdate || loading) && <div className="loader"></div>}
				{errorUpdate && <p className="red-text">{errorUpdate}</p>}
				<form onSubmit={handleSubmit(onSubmit)}>
					{error && <h4 className="error">{error}</h4>}
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
						type="number"
						name="phoneNumber"
						label="Phone Number"
						onWheel={(e) => e.currentTarget.blur()}
						id="phoneNumber"
						error={errors.phoneNumber}
						value={values.phoneNumber}
					/>

					<Checkbox
						checked={isAdmin}
						onChange={handleCheckbox}
						label="Admin?"
						id="Checkbox_3"
						value="true"
					/>
					<br />
					<br />
					<Button type="submit">Update</Button>
				</form>
			</div>
		</>
	);
}

export default UserEditPage;
