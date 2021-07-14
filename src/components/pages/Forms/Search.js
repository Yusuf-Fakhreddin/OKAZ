import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./Fields/FormInput";

import cities from "./Fields/cities.json";
import MyAutoComplete from "./Fields/MyAutoComplete";
import { useHistory } from "react-router";
import { Button, Icon } from "react-materialize";

function Search({ city, productName }) {
	const history = useHistory();

	const validationSchema = Yup.object({
		itemName: Yup.string().required("Required"),
		// may need to make specify cities the value should be one of them
		city: Yup.string(),
	});

	const { register, handleSubmit, errors, getValues } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		city && setselectedCity(city);
	}, [city]);

	const onSubmit = ({ itemName, city }) => {
		city = selectedCity;
		history.push(`/search/${itemName}/${city && city}`);
	};
	const [selectedCity, setselectedCity] = useState("");

	const complete = (e) => {
		console.log(e.target.value);
		setselectedCity(e.target.value);
	};
	const values = getValues();
	return (
		<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
			<h4>Search By Name</h4>
			<FormInput
				register={register}
				type="text"
				name="itemName"
				label="*Product Name"
				error={errors.itemName}
				value={productName}
			/>
			<MyAutoComplete
				complete={complete}
				setSelected={setselectedCity}
				cities={cities}
				alreadySelected={city}
			/>
			{/* <Autocomplete
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
			/> */}
			<Button className="bg-button" node="button" waves="light" type="submit">
				Search
				<Icon right>search</Icon>
			</Button>{" "}
		</form>
	);
}

export default Search;
