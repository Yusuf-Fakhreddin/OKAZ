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
		}
		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		}
	}, [history, userInfo, successCreate]);

	const validationSchema = Yup.object({
		itemName: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		description: Yup.string(),
		category: Yup.string(),
		price: Yup.string().required("Required"),
		ownerName: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
		// itemPicture: Yup.mixed()
		// 	.test(
		// 		"fileSize",
		// 		"File is too large",
		// 		(value) => value && value[0].size <= FILE_SIZE
		// 	)
		// 	.test(
		// 		"fileType",
		// 		"Format is not supported",
		// 		(value) => value && SUPPORTED_FORMATS.includes(value[0].type)
		// 	),
	});
	const { register, handleSubmit, errors, setValue } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	const onSubmit = async (data, errors) => {
		const file = data.itemPicture[0];
		console.log(file);

		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);
		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await http.post("/api/upload", formData, config);

			setValue("itemPicture", data);
		} catch (error) {
			console.error(error);
		}
		// dispatch(createProduct(data));
		console.log(data);
	};

	return (
		<>
			<Header />
			<div className="form">
				<div className="formContainer">
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
							name="ownerNumber"
							label="Owner Number"
							onWheel={(e) => e.preventDefault()}
							id="ownerNumber"
							error={errors.fullname}
						/>
						<FormInput
							register={register}
							type="text"
							name="itemName"
							label="Item Name"
							id="itemName"
							error={errors.itemName}
						/>
						<FormInput
							register={register}
							type="number"
							name="price"
							onWheel={(e) => e.preventDefault()}
							label="Price (EGP)"
							id="price"
							error={errors.price}
						/>
						<SuggestionInput
							register={register}
							type="text"
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
								<option value="doesNotApply">Does not apply</option>
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

						<button type="submit">Place Ad</button>
					</form>
					{/* Pictures Side */}
					<div className="image-upload">
						{!mainImg && (
							<h2>
								There is no Ad without a picture <br /> please add one
							</h2>
						)}
						{mainImg && <h2>Change Picture ?</h2>}
						<label>
							<input
								ref={register}
								type="file"
								accept="image/*"
								name="itemPicture"
								// onChange={uploadFileHandler}
								onChange={(e) => {
									console.log(e.target.files[0]);
									setMainImg(URL.createObjectURL(e.target.files[0]));
									setValue("itemPicture", e.target.files, {
										shouldValidate: true,
									});
								}}
							/>
							<span>+</span>
						</label>

						{errors.itemPicture && (
							<div className="error">*{errors.itemPicture.message}</div>
						)}
						{loadingCreate && <div className="loader"></div>}

						{mainImg && (
							<div className="main-img">
								<img src={mainImg} style={{ width: "80%" }} alt="" />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default ItemForm;
