import React from "react";

const FormInput = ({ type, register, error, label, id, ...inputProps }) => {
	return (
		<>
			<div className="form-control">
				<label htmlFor={id}>{label}</label>
				{type === "textarea" ? (
					<textarea id={id} ref={register} {...inputProps} rows={10} />
				) : (
					<input id={id} ref={register} type={type} {...inputProps} />
				)}

				{error && <h1 className="error">{error.message}</h1>}
			</div>
		</>
	);
};

export default FormInput;
