import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Form.scss";
import Header from "../../components/Header/Header";
import FormInput from "./Fields/FormInput";

import SuggestionInput from "./Fields/SuggestionsInput";
import cities from "./Fields/cities";
function ItemForm(props) {
	// const [imgTouched, setImgTouched] = useState(false);
	const [mainImg, setMainImg] = useState(null);
	useEffect(() => {
		document.title = "Place Ad";
	}, []);

	const FILE_SIZE = 5 * 1024 * 1024;
	const SUPPORTED_FORMATS = [
		"image/jpg",
		"image/jpeg",
		"image/gif",
		"image/png",
		"image/jfif",
	];
	const validationSchema = Yup.object({
		itemName: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		description: Yup.string(),
		ownerName: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
		itemPicture: Yup.mixed()
			.required("Required")
			.test(
				"fileSize",
				"File is too large",
				(value) => value && value[0].size <= FILE_SIZE
			)
			.test(
				"fileType",
				"Format is not supported",
				(value) => value && SUPPORTED_FORMATS.includes(value[0].type)
			),
	});
	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});
	const onSubmit = (data) => {
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
							onWheel={(e) => e.currentTarget.blur()}
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
						<SuggestionInput
							register={register}
							type="text"
							name="city"
							label="Specific City ?"
							error={errors.city}
							data={cities}
						/>
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
							<div>
								<h2>
									There is no Ad without a picture <br /> please add one
								</h2>
								<label>
									<input
										type="file"
										accept="image/*"
										name="itemPicture"
										onChange={(e) => {
											setMainImg(URL.createObjectURL(e.target.files[0]));
										}}
									/>
									<span>+</span>
								</label>
							</div>
						)}
						{errors.itemPicture && (
							<div className="error">*{errors.itemPicture.message}</div>
						)}
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
