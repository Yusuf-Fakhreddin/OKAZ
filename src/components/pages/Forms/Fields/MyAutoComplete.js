import React from "react";
import { Autocomplete, Icon } from "react-materialize";

const MyAutoComplete = ({ complete, setSelected, cities, alreadySelected }) => {
	return (
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
			placeholder="Choose a City to search in"
			title="Specific City ?"
			value={alreadySelected}
		/>
	);
};

export default MyAutoComplete;
