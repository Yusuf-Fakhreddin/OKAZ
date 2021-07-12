import React from "react";
import { Select } from "react-materialize";
const MySelect = ({ select, name, alreadySelected, values, error }) => {
	return (
		<div className="input-field">
			<Select
				onChange={select}
				multiple={false}
				id={name}
				options={{
					classes: error,
					error: error,
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
				error={error}
			>
				<option value="" selected={!alreadySelected} disabled>
					*Select a {name}
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
			{/* {error && <small className=" select helper-text red-text">{error}</small>} */}
		</div>
	);
};

export default MySelect;
