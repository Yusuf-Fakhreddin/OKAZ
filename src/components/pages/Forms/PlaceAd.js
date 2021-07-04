import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./Fields/FormInput";
import { Icon, Button, TextInput, ProgressBar } from "react-materialize";

import cities from "./Fields/cities";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../actions/productActions";
import http from "../../../httpService";
import MyMediaBox from "../../MyMediaBox/MyMediaBox";
import MySelect from "../Forms/Fields/MySelect";
import MyAutoComplete from "../Forms/Fields/MyAutoComplete";
import { categories, conditions } from "./Fields/selectOptions";
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
		city: Yup.string(),
		description: Yup.string(),
		category: Yup.string(),
		price: Yup.string().required("Required"),
		ownerPhoneNumber: Yup.string()
			.required("Required")
			.matches(
				/^(01)[0-9]{9}$/,
				"Please enter a proper 11 digits number starts with 01 "
			),
		ownerName: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
	});
	const { register, handleSubmit, errors, setValue, getValues } = useForm({
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

	const [selectedCategory, setselectedCategory] = useState("");
	const [selectedCondition, setselectedCondition] = useState("");
	const [selectedCity, setselectedCity] = useState("");

	const [selectedCategoryError, setselectedCategoryError] = useState("");
	const [selectedConditionError, setselectedConditionError] = useState("");
	const [selectedCityError, setselectedCityError] = useState("");
	const values = getValues();

	const onSubmit = async (data, errors) => {
		values.category = selectedCategory;
		values.condition = selectedCondition;
		values.city = selectedCity;
		if (!selectedCondition || !selectedCategory || !selectedCity || !image) {
			if (!selectedCondition) setselectedConditionError("invalid");
			if (!selectedCity) setselectedCityError("Location is required");
			if (!selectedCategory) setselectedCategoryError("invalid");
			if (!image) setImageError("Image is Required");
			return;
		}

		console.log({ ...values, image });
		dispatch(createProduct({ ...values, image }));
		// console.log({ productId, ...data, image });
	};
	const selectCategory = (e) => {
		setselectedCategory(e.target.value);
		setselectedCategoryError("");
	};

	const selectCondition = (e) => {
		setselectedCondition(e.target.value);
		setselectedConditionError("");
	};
	const complete = (e) => {
		console.log(e.target.value);
		setselectedCity(e.target.value);
		setselectedCityError("");
	};

	return (
		<>
			<Header />
			<div className="form container section">
				<div>
					<h2>Your Ad </h2>
					<p className="label grey-text">
						Fields with * before labels are required
					</p>

					{loading && <div className="loader"></div>}
					{errorCreate && <p className="red-text">{errorCreate}</p>}
					{error && <p className="red-text">{error}</p>}
					<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						<FormInput
							register={register}
							type="text"
							name="ownerName"
							label="*Owner Name"
							id="ownerName"
							error={errors.ownerName}
							value={values.ownerName}
							active
						/>
						<FormInput
							register={register}
							type="text"
							name="ownerPhoneNumber"
							label="*Owner Phone Number"
							id="ownerPhoneNumber"
							value={values.ownerPhoneNumber}
							error={errors.ownerPhoneNumber}
							active
						/>
						<FormInput
							register={register}
							type="text"
							name="productName"
							label="*Product Name"
							id="productName"
							error={errors.productName}
							value={values.productName}
						/>
						<FormInput
							register={register}
							type="number"
							name="price"
							onWheel={(event) => event.currentTarget.blur()}
							label="*Price (EGP)"
							id="price"
							error={errors.price}
							value={values.price}
						/>

						{/* <Autocomplete
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
						/> */}
						<MyAutoComplete
							complete={complete}
							setSelected={setselectedCity}
							cities={cities}
							placeholder="Where is the product located ?"
							title="*Location"
							error={selectedCityError}
						/>
						<div>
							<MySelect
								select={selectCondition}
								name="condition"
								values={conditions}
								error={selectedConditionError}
							/>
							{/* <Select
								onChange={selectCondition}
								name="condition"
								id="Select-9"
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
								value=""
							>
								<option disabled value="">
									New or Used ?
								</option>
								<option value="New">New</option>
								<option value="Used">Used</option>
								<option value="Does not apply">Does not apply</option>
							</Select> */}
						</div>
						<div>
							<MySelect
								select={selectCategory}
								name="category"
								values={categories}
								error={selectedCategoryError}
							/>
							{/* <Select
								onChange={selectCategory}
								name="category"
								id="Select-9"
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
								value=""
							>
								<option disabled value="">
									Select a category
								</option>
								<option value="Technology">Technology</option>
								<option value="Home">Home</option>
								<option value="Vehicles">Vehicles</option>
								<option value="Fashion">Fashion</option>
								<option value="Pets">Pets</option>
							</Select> */}
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
								<h5 className="center-align">
									There is no ad without a picture <br /> please add one
								</h5>
							)}
							{mainImg && <h5>Change Picture ?</h5>}
							{/* <input
									type="file"
									accept="image/*"
									name="itemPicture"
									onChange={uploadFileHandler}
								/>
								<span>+</span> */}
							<TextInput
								id="TextInput-4"
								label={<Icon>add</Icon>}
								type="file"
								accept="image/*"
								name="itemPicture"
								onChange={uploadFileHandler}
							/>

							{imageError && !mainImg && (
								<p className="red-text">*{imageError}</p>
							)}

							{uploading && <ProgressBar />}

							{mainImg && (
								<div className="section ">
									<MyMediaBox image={mainImg} height="650px" width="650px" />
								</div>
							)}
						</div>
						{loadingCreate && <ProgressBar />}

						<Button large type="submit">
							Place Ad
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}

export default ItemForm;
