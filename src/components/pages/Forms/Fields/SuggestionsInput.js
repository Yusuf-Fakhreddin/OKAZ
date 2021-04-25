import React, { useState } from "react";

const SuggestionInput = ({
	type,
	register,
	error,
	label,
	id,
	data,
	name,
	value,
	...inputProps
}) => {
	const [suggestions, setSuggestions] = useState([]);
	const [text, setText] = useState(value);
	// const [items, setItems] = useState(["white", "whiteee", "yellow", "Helloww"]);

	const onTextChanged = (e) => {
		const value = e.target.value;
		let suggestions = [];

		if (value.length > 0) {
			suggestions = data.filter(
				(suggestion) =>
					suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
			);
		}
		setSuggestions(suggestions.sort());
		setText(value);
	};

	const suggestionSelected = (value) => {
		console.log(value);
		setText(value);
		setSuggestions([]);
	};

	const renderSuggestions = () => {
		if (suggestions.length === 0) {
			return null;
		}
		return (
			<ul className="suggestions">
				{suggestions.map((item) => (
					<li key={item} onClick={() => suggestionSelected(item.trim())}>
						{item}
					</li>
				))}
			</ul>
		);
	};
	return (
		<>
			<div className="form-control">
				<label htmlFor={id}>{label}</label>
				<input
					id={id}
					ref={register}
					onChange={onTextChanged}
					value={text}
					type={type}
					name={name}
					{...inputProps}
				/>
				{renderSuggestions()}
				{error && <h1 className="error">{error.message}</h1>}
			</div>
		</>
	);
};

export default SuggestionInput;
