import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./Fields/FormInput";
import "../../../styles/Form.scss";
import SuggestionInput from "./Fields/SuggestionsInput";
import cities from "./Fields/cities";
import { useHistory } from "react-router";

function Explore({ props }) {
	const history = useHistory();
	const validationSchema = Yup.object({
		category: Yup.string().required("Required"),
		// may need to make specify cities the value should be one of them
		city: Yup.string(),
	});

	const { register, handleSubmit, errors, formState } = useForm({
		mode: "onChange",
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = ({ category, city }) => {
		console.log(city);
		history.push(`/explore/${category}/${city}`);
	};

	return (
		<div className="search-container">
			<form
				className="search"
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="form-control">
					<label htmlFor="category">Select a category</label>
					<select ref={register} name="category">
						<option value="" disabled selected>
							{" "}
							Select a category{" "}
						</option>
						<option value="Technology">Technology</option>
						<option value="Home">Home</option>
						<option value="Vehicles">Vehicles</option>
						<option value="Fashion">Fashion</option>
						<option value="Pets">Pets</option>
					</select>
				</div>
				<SuggestionInput
					register={register}
					type="text"
					name="city"
					label="Specific City ?"
					error={errors.city}
					data={cities}
				/>
				<button type="submit">Explore</button>
			</form>
		</div>
	);
}

export default Explore;
