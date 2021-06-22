import React from "react";
import { TextInput, Textarea } from "react-materialize";

const FormInput = ({
	type,
	register,
	error,
	label,
	id,
	value,
	...inputProps
}) => {
	return (
		<>
			<div>
				{error && (
					<small className="helper-text red-text">{error.message}</small>
				)}
				{type === "textarea" ? (
					<Textarea
						label={label}
						ref={register}
						id={id}
						placeholder={value}
						l={12}
						m={12}
						s={12}
						xl={12}
					/>
				) : (
					<TextInput
						label={label}
						type={type}
						id={id}
						ref={register}
						{...inputProps}
						placeholder={value}
						error={error && error.message}
					/>
				)}

				{/* {error && <p>{error.message}</p>} */}
			</div>
		</>
	);
};

export default FormInput;
