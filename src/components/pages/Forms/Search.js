import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./Fields/FormInput";
import "../../../styles/Form.scss";
import SuggestionInput from "./Fields/SuggestionsInput";
import cities from "./Fields/cities";
function Search(props) {
	const validationSchema = Yup.object({
		itemName: Yup.string().required("Required"),
		// may need to make specify cities the value should be one of them
		city: Yup.string().required("Required"),
	});

	const { register, handleSubmit, errors, formState } = useForm({
		mode: "onChange",
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = ({ itemName, city }) => {
		console.log(itemName, city);
	};

	return (
		<div className="search-container">
			<form
				className="search"
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormInput
					register={register}
					type="text"
					name="itemName"
					label="Item Name"
					error={errors.itemName}
				/>
				<SuggestionInput
					register={register}
					type="text"
					name="city"
					label="Specific City ?"
					error={errors.city}
					data={cities}
				/>
				<button type="submit" disabled={!formState.isValid}>
					Search
				</button>
			</form>
		</div>
	);
}

export default Search;
