import React, { useEffect } from "react";
import { Autocomplete, Icon } from "react-materialize";

function MyAutoComplete({
	complete,
	setSelected,
	cities,
	alreadySelected,
	placeholder,
	title,
	error,
}) {
	useEffect(() => {
		console.log(alreadySelected);
	}, [alreadySelected]);
	return (
		<React.Fragment>
			<Autocomplete
				name="city"
				type="text"
				onChange={complete}
				icon={<Icon>place</Icon>}
				id="city"
				options={{
					onAutocomplete: function (value) {
						console.log(value);
						setSelected(value);
					},
					data: cities,
				}}
				placeholder={placeholder ? placeholder : "Choose a City to search in"}
				title={title ? title : "Specific City ?"}
				defaultValue={alreadySelected}
			/>
			{error && <p className="helper-text red-text">{error}</p>}
		</React.Fragment>
	);
}

export default MyAutoComplete;
