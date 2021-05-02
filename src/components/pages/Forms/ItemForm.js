import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../../styles/Form.scss";
import FormInput from "./Fields/FormInput";

import SuggestionInput from "./Fields/SuggestionsInput";
import cities from "./Fields/cities";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../actions/productActions";
import http from "../../../htppService";
function ItemForm({ props, history }) {
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(null);

	const dispatch = useDispatch();

	const [mainImg, setMainImg] = useState(null);
	const [uploading, setUploading] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	useEffect(() => {
		document.title = "Place Ad";
		if (!userInfo) {
			history.push("/login");
		} else {
			setValue("ownerPhoneNumber", userInfo.phoneNumber);
			setValue("ownerName", userInfo.name);
		}
		if (successCreate) {
			history.push(`/item/${createdProduct._id}`);
		}
	}, [history, userInfo, successCreate]);

	const validationSchema = Yup.object({
		productName: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		description: Yup.string(),
		category: Yup.string(),
		price: Yup.string().required("Required"),
		ownerName: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
	});
	const { register, handleSubmit, errors, setValue, setError } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		setUploading(true);
		console.log(formData.getAll("image"));
		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await http.post(
				"https://okazapp.herokuapp.com/api/upload",
				formData,
				config
			);
			console.log(data);
			console.log(`https://okazapp.herokuapp.com/${data}`);
			setImage(`https://okazapp.herokuapp.com/${data}`);
			setUploading(false);
			setMainImg(URL.createObjectURL(e.target.files[0]));
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const onSubmit = async (data, errors) => {
		if (!image) {
			setImageError("Image is Required");
			return;
		}
		dispatch(createProduct({ ...data, image }));
		// console.log({ productId, ...data, image });
	};

	return (
		<>
			<Header />
			<div className="form">
				<div>
					<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						<FormInput
							register={register}
							type="text"
							name="ownerName"
							label="Owner Name"
							id="ownerName"
							error={errors.ownerName}
						/>
						<FormInput
							register={register}
							type="number"
							name="ownerPhoneNumber"
							label="Owner Number"
							onWheel={(event) => event.target.blur()}
							id="ownerPhoneNumber"
							// error={errors.fullname}
						/>
						<FormInput
							register={register}
							type="text"
							name="productName"
							label="Item Name"
							id="productName"
							error={errors.productName}
						/>
						<FormInput
							register={register}
							type="number"
							name="price"
							onWheel={(event) => event.currentTarget.blur()}
							label="Price (EGP)"
							id="price"
							error={errors.price}
						/>
						<SuggestionInput
							register={register}
							type="text"
							autoComplete="off"
							name="city"
							label="Specific City ?"
							error={errors.city}
							data={cities}
						/>
						<div className="form-control">
							<label htmlFor="category">Select a category</label>
							<select ref={register} name="category">
								<option value="" disabled selected>
									{" "}
									Select a category{" "}
								</option>
								<option value="Technology">Technology</option>
								<option value="Home">Home</option>
								<option value="Vehicles">Vehicles</option>
								<option value="Fashion">Fashion</option>
								<option value="Pets">Pets</option>
							</select>
						</div>

						<div className="form-control">
							<label htmlFor="condition"> Condition </label>
							<select ref={register} name="condition">
								<option value="" disabled selected>
									{" "}
									Is it new or used ?{" "}
								</option>
								<option value="New">New</option>
								<option value="Used">Used</option>
								<option value="Does not apply">Does not apply</option>
							</select>
						</div>

						<FormInput
							register={register}
							type="textarea"
							name="description"
							label="Description"
							id="description"
							error={errors.description}
						/>
						<div className="image-upload">
							{!mainImg && (
								<h2>
									There is no Ad without a picture <br /> please add one
								</h2>
							)}
							{mainImg && <h2>Change Picture ?</h2>}
							<label>
								<input
									type="file"
									accept="image/*"
									name="itemPicture"
									onChange={uploadFileHandler}
								/>
								<span>+</span>
							</label>

							{imageError && <div className="error">*{imageError}</div>}

							{uploading && <div className="loader"></div>}

							{mainImg && (
								<div className="main-img">
									<img src={mainImg} style={{ width: "80%" }} alt="" />
								</div>
							)}
						</div>
						<button type="submit">Place Ad</button>
					</form>
					{/* Pictures Side */}
				</div>
			</div>
		</>
	);
}

export default ItemForm;
