import React, { useState } from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./Fields/FormInput";
import cities from "./Fields/cities";
import { useHistory } from "react-router";
import {
	Icon,
	Button,
	Select,
	Autocomplete,
	TextInput,
} from "react-materialize";

function Explore({ props }) {
	const history = useHistory();
	const validationSchema = Yup.object({
		category: Yup.string().required("required"),
		// may need to make specify cities the value should be one of them
		city: Yup.string(),
	});

	const { register, handleSubmit, errors, getValues } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const [selectedCategory, setselectedCategory] = useState("");
	const [selectedCity, setselectedCity] = useState("");
	const [categroyError, setcategroyError] = useState(false);
	const onSubmit = ({ category, city }) => {
		console.log(errors);
		category = selectedCategory;
		city = selectedCity;
		if (!category) {
			setcategroyError(true);
			return;
		}
		history.push(`/explore/${category}/${city}`);
	};

	const values = getValues();
	const select = (e) => {
		setselectedCategory(e.target.value);
		setcategroyError(false);
	};
	const complete = (e) => {
		console.log(e.target.value);
		setselectedCity(e.target.value);
	};

	return (
		<div className="search-container">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h4>Explore a Category</h4>
				{categroyError && <p className="red-text">Please select a category</p>}
				<div>
					<Select
						onChange={select}
						ref={register}
						multiple={false}
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
						name="category"
					>
						<label htmlFor="">Select a category</label>
						<option value="" selected disabled>
							Select a category
						</option>
						<option value="Technology">Technology</option>
						<option value="Home">Home</option>
						<option value="Vehicles">Vehicles</option>
						<option value="Fashion">Fashion</option>
						<option value="Pets">Pets</option>
					</Select>
				</div>
				<Autocomplete
					ref={register}
					name="city"
					type="text"
					onChange={complete}
					icon={<Icon>place</Icon>}
					id="city"
					options={{
						onAutocomplete: function (value) {
							console.log(value);
							setselectedCity(value);
						},
						data: cities,
					}}
					placeholder="Choose a City to search in"
					title="Specific City ?"
				/>
				<Button node="button" waves="light" type="submit" onClick={onSubmit}>
					Explore
					<Icon right>category</Icon>
				</Button>{" "}
			</form>
		</div>
	);
}

export default Explore;
