import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../Forms/Fields/FormInput";
import cities from "../Forms/Fields/cities";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
	Icon,
	Button,
	Autocomplete,
	Select,
	TextInput,
	MediaBox,
	ProgressBar,
} from "react-materialize";
import {
	listProductsDetails,
	updateProduct,
} from "../../../actions/productActions";
import http from "../../../httpService";
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
		if (!userInfo) {
			if (!(userInfo._id === product.owner || userInfo.isAdmin))
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
				setValue("productName", product.productName);
				setValue("ownerName", product.ownerName);
				setValue("price", product.price);
				setMainImg(product.image);
				setImage(product.image);
				setselectedCategory(product.category);
				setselectedCondition(product.condition);
				setValue("description", product.description);
				setValue("ownerPhoneNumber", product.ownerPhoneNumber);
				setselectedCity(product.city);
			}
		}
	}, [history, userInfo, productId, product, successUpdate, dispatch]);

	const validationSchema = Yup.object({
		productName: Yup.string().required("Required"),
		city: Yup.string(),
		description: Yup.string(),
		category: Yup.string(),
		price: Yup.string().required("Required"),
		ownerName: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
	});

	const { register, handleSubmit, errors, setValue, getValues } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

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
	const [selectedCategory, setselectedCategory] = useState("");
	const [selectedCondition, setselectedCondition] = useState("");
	const [selectedCity, setselectedCity] = useState("");
	const values = getValues();

	const onSubmit = async (data, errors) => {
		if (!image) {
			setImageError("Image is Required");
			return;
		}
		values.city = selectedCity;
		values.condition = selectedCondition;
		values.category = selectedCategory;

		console.log({ productId, ...values, image });
		dispatch(updateProduct({ productId, ...values, image }));
	};
	const selectCategory = (e) => {
		setselectedCategory(e.target.value);
	};

	const selectCondition = (e) => {
		setselectedCondition(e.target.value);
	};
	const complete = (e) => {
		console.log(e.target.value);
		setselectedCity(e.target.value);
	};
	return (
		<>
			<Header />
			<div className=" section container">
				<div>
					{loading && <div className="loader"></div>}
					{errorUpdate && <p className="red-text">{errorUpdate}</p>}
					{error && <p className="red-text">{error}</p>}
					<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						<FormInput
							register={register}
							type="text"
							name="ownerName"
							label="Owner Name"
							id="ownerName"
							error={errors.ownerName}
							value={values.ownerName}
						/>
						<FormInput
							register={register}
							type="number"
							name="ownerPhoneNumber"
							label="Owner Number"
							onWheel={(event) => event.currentTarget.blur()}
							id="ownerPhoneNumber"
							value={values.ownerPhoneNumber}
						/>
						<FormInput
							register={register}
							type="text"
							name="productName"
							label="Product Name"
							id="productName"
							error={errors.productName}
							value={values.productName}
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
						<Autocomplete
							// ref={register}
							name="city"
							type="text"
							onChange={complete}
							icon={<Icon>place</Icon>}
							id="city"
							options={{
								onAutocomplete: function (value) {
									console.log(value);
									setselectedCity(value);
								},
								data: cities,
							}}
							placeholder="Choose a City to search in"
							title="Specific City ?"
							value={selectedCity}
						/>
						<div className="form-control">
							<Select
								onChange={selectCategory}
								// ref={register}
								name="category"
								id="category"
								multiple={false}
								options={{
									classes: "",
									dropdownOptions: {
										alignment: "left",
										autoTrigger: true,
										closeOnClick: true,
										constrainWidth: true,
										coverTrigger: true,
										hover: false,
										inDuration: 150,
										onCloseEnd: null,
										onCloseStart: null,
										onOpenEnd: null,
										onOpenStart: null,
										outDuration: 250,
									},
								}}
							>
								<option disabled value="">
									Select a category
								</option>
								<option
									selected={selectedCategory === "Technology"}
									value="Technology"
								>
									Technology
								</option>
								<option selected={selectedCategory === "Home"} value="Home">
									Home
								</option>
								<option
									selected={selectedCategory === "Vehicles"}
									value="Vehicles"
								>
									Vehicles
								</option>
								<option
									selected={selectedCategory === "Fashion"}
									value="Fashion"
								>
									Fashion
								</option>
								<option selected={selectedCategory === "Pets"} value="Pets">
									Pets
								</option>
							</Select>
						</div>

						<div className="form-control">
							<Select
								// ref={register}
								onChange={selectCondition}
								name="condition"
								id="condition"
								multiple={false}
								options={{
									classes: "",
									dropdownOptions: {
										alignment: "left",
										autoTrigger: true,
										closeOnClick: true,
										constrainWidth: true,
										coverTrigger: true,
										hover: false,
										inDuration: 150,
										onCloseEnd: null,
										onCloseStart: null,
										onOpenEnd: null,
										onOpenStart: null,
										outDuration: 250,
									},
								}}
							>
								<option disabled value="">
									New or Used ?
								</option>
								<option selected={selectedCondition === "New"} value="New">
									New
								</option>
								<option selected={selectedCondition === "Used"} value="Used">
									Used
								</option>
								<option
									selected={selectedCondition === "Does not apply"}
									value="Does not apply"
								>
									Does not apply
								</option>
							</Select>
						</div>

						<FormInput
							register={register}
							type="textarea"
							name="description"
							label="Description"
							id="description"
							error={errors.description}
							value={values.description}
						/>
						<div className="image-upload">
							{!mainImg && (
								<h5 className="center-align">
									There is no Ad without a picture <br /> please add one
								</h5>
							)}
							{mainImg && <h5>Change Picture ?</h5>}

							<TextInput
								id="TextInput-4"
								label={<Icon>add</Icon>}
								type="file"
								accept="image/*"
								name="itemPicture"
								onChange={uploadFileHandler}
							/>

							{imageError && !mainImg && (
								<div className="error">*{imageError}</div>
							)}

							{uploading && <ProgressBar />}

							{mainImg && (
								<div className="section">
									<MediaBox
										id="MediaBox_7"
										options={{
											inDuration: 275,
											onCloseEnd: null,
											onCloseStart: null,
											onOpenEnd: null,
											onOpenStart: null,
											outDuration: 200,
										}}
									>
										<img alt="" src={mainImg} width="650" />
									</MediaBox>
								</div>
							)}
						</div>
						{loadingUpdate && <ProgressBar />}
						<Button large type="submit">
							Update Ad
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}

export default AdUpdatePage;
