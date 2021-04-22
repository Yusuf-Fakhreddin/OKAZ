import React, { useState } from "react";

function AutoComplete(props) {
	const [suggestions, setSuggestions] = useState([]);
	const [text, setText] = useState("");
	const [items, setItems] = useState(["white", "whiteee", "yellow", "Helloww"]);

	const onTextChanged = (e) => {
		const value = e.target.value;
		let suggestions = [];

		if (value.length > 0) {
			suggestions = items.filter(
				(suggestion) =>
					suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
			);
		}

		setSuggestions(suggestions.sort());
		setText(value);
	};

	const suggestionSelected = (value) => {
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
					<li onClick={() => suggestionSelected(item)}>{item}</li>
				))}
			</ul>
		);
	};

	return (
		<div className="form-control">
			<label>City</label>
			<input value={text} onChange={onTextChanged} type="text" />
			{renderSuggestions()}
		</div>
	);
}
export default AutoComplete;
