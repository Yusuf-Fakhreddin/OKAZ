import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../../styles/Form.scss";
import FormInput from "../Forms/Fields/FormInput";

import SuggestionInput from "../Forms/Fields/SuggestionsInput";
import cities from "../Forms/Fields/cities";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
	createProduct,
	listProductsDetails,
	updateProduct,
} from "../../../actions/productActions";
import http from "../../../htppService";
import { PRODUCT_UPDATE_RESET } from "../../../constants/productConstants";

function AdUpdatePage({ match, history }) {
	const productId = match.params.id;

	const dispatch = useDispatch();

	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(null);

	const [mainImg, setMainImg] = useState(null);
	const [uploading, setUploading] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	useEffect(() => {
		document.title = "Update AD";
		console.log(product);
		if (
			!(userInfo && (userInfo._id === product.ownerName || userInfo.isAdmin))
		) {
			history.push("/login");
		}
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			if (userInfo.isAdmin) history.push("/admin/adsList");
			else history.push(`/item/${productId}`);
		} else {
			if (!product.productName || product._id !== productId) {
				dispatch(listProductsDetails(productId));
			} else {
				console.log("hello");
				setValue("productName", product.productName);
				setValue("ownerName", product.ownerName);
				setValue("price", product.price);
				setMainImg(product.image);
				setImage(product.image);
				setValue("category", product.category);
				setValue("condition", product.condition);
				setValue("description", product.description);
				setValue("ownerPhoneNumber", product.ownerPhoneNumber);
				setValue("city", product.city);
			}
		}
	}, [history, userInfo, productId, product, successUpdate]);

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

	const {
		register,
		handleSubmit,
		errors,
		setValue,
		setError,
		formState,
	} = useForm({
		defaultValues: {
			city: "",
		},
		resolver: yupResolver(validationSchema),
	});

	// const uploadFileHandler = async (e) => {
	// 	setMainImg(URL.createObjectURL(e.target.files[0]));
	// 	const file = e.target.files[0];
	// 	console.log(file);

	// 	const formData = new FormData();
	// 	formData.append("image", file);
	// 	setUploading(true);
	// 	try {
	// 		const config = {
	// 			headers: {
	// 				"Content-Type": "multipart/form-data",
	// 			},
	// 		};
	// 		console.log(formData, formData.image);
	// 		const { data } = await http.post(
	// 			"https://okazapp.herokuapp.com/api/upload",
	// 			formData,
	// 			config
	// 		);
	// 		setImage(data);
	// 		console.log(image);
	// 		setUploading(false);
	// 	} catch (error) {
	// 		console.error(error);
	// 		setUploading(false);
	// 	}
	// };
	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		setUploading(true);
		console.log(formData.getAll("image"));
		// 		var options = { content: formData };
		// console.log(options);
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
		dispatch(updateProduct({ productId, ...data, image }));
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
							onWheel={(event) => event.currentTarget.blur()}
							id="ownerPhoneNumber"
							error={errors.fullname}
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
							name="city"
							label="Specific City ?"
							error={errors.city}
							id="city"
							value={formState.city}
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
									name="image"
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
						<button type="submit">Update Ad</button>
					</form>
					{/* Pictures Side */}
				</div>
			</div>
		</>
	);
}

export default AdUpdatePage;
