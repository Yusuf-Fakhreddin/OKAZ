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
			if (userInfo.isAdmin) history.push("/item/productlist");
			else history.push(`/item/${productId}`);
		} else {
			if (!product.productName || product._id !== productId) {
				dispatch(listProductsDetails(productId));
			} else {
				console.log("hello");
				setValue("itemName", product.productName);
				setValue("ownerName", product.ownerName);
				setValue("price", product.price);
				setMainImg(product.image);
				setImage(product.image);
				// setValue("category", product.category);
				setValue("description", product.description);
				setValue("city", product.city);
			}
		}
	}, [history, userInfo, productId, product, successUpdate]);

	const validationSchema = Yup.object({
		itemName: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		description: Yup.string(),
		category: Yup.string(),
		price: Yup.string().required("Required"),
		ownerName: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
	});
	const { register, handleSubmit, errors, setValue, setError } = useForm({
		resolver: yupResolver(validationSchema),
	});

	const uploadFileHandler = (e) => {
		setImage(e.target.files[0]);
		setMainImg(URL.createObjectURL(e.target.files[0]));
	};

	const onSubmit = async (data, errors) => {
		if (!image) {
			setImageError("Required");
			return;
		}
		const file = image;
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

			const { data } = await http.post(
				"https://okazapp.herokuapp.com/api/upload",
				formData,
				config
			);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}

		// dispatch(updateProduct({ ...data, itemPicture: image }));
		console.log({ ...data, itemPicture: image });
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
							{loadingUpdate && <div className="loader"></div>}

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

export default AdUpdatePage;
