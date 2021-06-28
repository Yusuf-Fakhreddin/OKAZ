import React from "react";
// import { TextInput, Textarea } from "react-materialize";

const FormInput = ({
	type,
	register,
	error,
	label,
	id,
	value,
	name,
	...inputProps
}) => {
	return (
		<>
			<div className="input-field">
				<label className={value && "active"} htmlFor={id}>
					{label}
				</label>

				{type === "textarea" ? (
					<textarea
						ref={register}
						id={id}
						className="materialize-textarea"
						name={name}
						defaultValue={value}
						l={12}
						m={12}
						s={12}
						xl={12}
					/>
				) : (
					<input
						type={type}
						id={id}
						name={name}
						ref={register}
						defaultValue={value}
					/>
				)}
				{error && (
					<small className="helper-text red-text">{error.message}</small>
				)}
				{/* {error && <p>{error.message}</p>} */}
			</div>
		</>
	);
};

export default FormInput;
