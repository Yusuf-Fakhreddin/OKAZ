import React from "react";
import { Select } from "react-materialize";
const MySelect = ({ select, name, alreadySelected, values }) => {
	console.log(values);
	return (
		<Select
			onChange={select}
			multiple={false}
			id={name}
			options={{
				classes: "",
				dropdownOptions: {
					alignment: "left",
					autoTrigger: true,
					closeOnClick: true,
					constrainWidth: true,
					coverTrigger: true,
					hover: false,
					inDuration: 150,
					onCloseEnd: null,
					onCloseStart: null,
					onOpenEnd: null,
					onOpenStart: null,
					outDuration: 250,
				},
			}}
			name={name}
			value={alreadySelected}
		>
			<option value="" selected={!alreadySelected} disabled>
				Select a {name}
			</option>
			{values.map((value) => (
				<option
					key={value}
					selected={alreadySelected && alreadySelected === value}
					value={value}
				>
					{value}
				</option>
			))}
		</Select>
	);
};

export default MySelect;
