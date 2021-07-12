import React, { useEffect } from "react";
// import { TextInput, Textarea } from "react-materialize";

const FormInput = ({
	type,
	register,
	error,
	label,
	id,
	value,
	name,
	active,
	...inputProps
}) => {
	let rows;
	if (type === "textarea" && value) {
		const textArea = document.querySelector("textarea");
		const textRowCount = textArea ? textArea.value.split("\n").length : 0;
		rows = textRowCount + 1;
	}

	return (
		<>
			<div className="input-field">
				{type === "textarea" ? (
					<textarea
						spellCheck="false"
						ref={register}
						id={id}
						className="materialize-textarea Mytextarea"
						name={name}
						defaultValue={value}
						l={12}
						m={12}
						s={12}
						xl={12}
						rows={rows}
						{...inputProps}
					/>
				) : (
					<input
						spellCheck="false"
						type={type}
						id={id}
						name={name}
						ref={register}
						defaultValue={value}
						{...inputProps}
					/>
				)}
				<label className="active" htmlFor={id}>
					{label}
				</label>

				{error && (
					<small className="helper-text red-text">{error.message}</small>
				)}
				{/* {error && <p>{error.message}</p>} */}
			</div>
		</>
	);
};

export default FormInput;
