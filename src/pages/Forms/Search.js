import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./Fields/FormikControl";

function Search(props) {
	const initialValues = {
		itemName: "",
		city: "",
	};
	const validationSchema = Yup.object({
		itemName: Yup.string().required("Required"),
		// may need to make specify cities the value should be one of them
		city: Yup.string(),
	});

	const onSubmit = async (values, { setFieldError }) => {
		console.log(values);
	};

	return (
		<div className="search-container">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{(formik) => {
					return (
						<Form className="search" autoComplete="off">
							<FormikControl
								control="input"
								type="text"
								name="itemName"
								label="Item Name"
							/>
							<FormikControl
								control="input"
								type="text"
								name="city"
								label="Specific City ?"
							/>
							<button type="submit" disabled={!formik.dirty || !formik.isValid}>
								Search
							</button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

export default Search;
