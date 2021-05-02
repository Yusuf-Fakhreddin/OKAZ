import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./Fields/FormInput";
import "../../../styles/Form.scss";
import SuggestionInput from "./Fields/SuggestionsInput";
import cities from "./Fields/cities";
import { useHistory } from "react-router";
function Search({ props }) {
	const history = useHistory();

	const validationSchema = Yup.object({
		itemName: Yup.string().required("Required"),
		// may need to make specify cities the value should be one of them
		city: Yup.string(),
	});

	const { register, handleSubmit, errors, formState } = useForm({
		mode: "onChange",
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = ({ itemName, city }) => {
		history.push(`/search/${itemName}/${city}`);
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
				<button type="submit">Search</button>
			</form>
		</div>
	);
}

export default Search;
