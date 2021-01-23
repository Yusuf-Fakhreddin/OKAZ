import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Input(props) {
	const { label, name, ...rest } = props;
	return (
		<div className="form-control">
			{label ? <label htmlFor={name}>{label}</label> : null}

			<Field id={name} name={name} {...rest} />

			<ErrorMessage component={TextError} name={name} />
		</div>
	);
}

export default Input;
