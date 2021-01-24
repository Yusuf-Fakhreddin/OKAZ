import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Form.scss";
import FormikControl from "./Fields/FormikControl";
import Header from "../../components/Header/Header";
function ItemForm(props) {
	const [imgTouched, setImgTouched] = useState(false);
	const [mainImg, setMainImg] = useState(null);
	useEffect(() => {
		document.title = "Place Ad";
	}, []);

	const initialValues = {
		ownerName: "",
		ownerNumber: "",
		itemName: "",
		city: "",
		description: "",
		itemPicture: null,
	};

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
		// itemPicture: Yup.object()
		// 	.nullable()
		// 	.required("Required")
		// 	.test("fileSize", "File is too large", (value) => value.size <= FILE_SIZE)
		// 	.test("fileType", "Format is not supported", (value) =>
		// 		SUPPORTED_FORMATS.includes(value.type)
		// 	),
	});

	const onSubmit = async (values, { setFieldError }) => {
		console.log(values);
	};

	const validate = (values) => {
		const errors = {};
		if (imgTouched) {
			if (!values.itemPicture) errors.itemPicture = "Required";
			else if (values.itemPicture.size > FILE_SIZE)
				errors.itemPicture = "This File is too large";
			else if (SUPPORTED_FORMATS.includes(values.itemPicture.type) === false)
				errors.itemPicture = "This format is not supported";

			if (!errors.itemPicture) {
				var reader = new FileReader();
				reader.readAsDataURL(values.itemPicture);

				reader.onloadend = (e) => {
					setMainImg(reader.result);
				};
			}
		}

		return errors;
	};

	return (
		<>
			<Header />
			<div className="form">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					validate={validate}
					validateOnChange={false}
				>
					{({
						dirty,
						isValid,
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						setFieldValue,
						setFieldError,
					}) => {
						return (
							<Form autoComplete="off">
								<div className="formContainer">
									<div>
										<FormikControl
											control="input"
											type="text"
											label="Owner Name"
											name="ownerName"
										/>
										<FormikControl
											control="input"
											type="number"
											onWheel={(e) => e.currentTarget.blur()}
											label="Owner Number"
											name="ownerNumber"
										/>
										<FormikControl
											control="input"
											type="text"
											label="Item Name"
											name="itemName"
										/>
										<FormikControl
											control="input"
											type="text"
											label="City"
											name="city"
										/>
										<FormikControl
											control="textarea"
											label="Description"
											name="description"
										/>
										<button type="submit" disabled={!dirty || !isValid}>
											Place Ad
										</button>
									</div>
									{/* Pictures Side */}
									<div className="image-upload">
										<h2>
											There is no Ad without a picture <br /> please add one
										</h2>
										<label>
											<input
												type="file"
												accept="image/*"
												name="itemPicture"
												onClick={() => {
													setImgTouched(true);
												}}
												onChange={(e) => {
													setFieldValue(
														"itemPicture",
														e.currentTarget.files[0]
													);
												}}
											/>
											<span>+</span>
										</label>
										{errors.itemPicture && (
											<div className="error">*{errors.itemPicture}</div>
										)}
										{mainImg && (
											<div className="main-img">
												<img
													src={mainImg}
													style={{ width: "60%", height: "60%" }}
													alt=""
												/>
											</div>
										)}
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
}

export default ItemForm;
