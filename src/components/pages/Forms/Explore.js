import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cities from "./Fields/cities";
import MyAutoComplete from "./Fields/MyAutoComplete";
import { useHistory } from "react-router";
import { Icon, Button, Select } from "react-materialize";
import MySelect from "./Fields/MySelect";
import { categories } from "./Fields/selectOptions";
function Explore({ category, city }) {
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
				<div>
					<MySelect
						select={select}
						name="category"
						values={categories}
						alreadySelected={category}
						error={categroyError && "invalid"}
					/>

					{/* <Select
						onChange={select}
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
						<option value="" selected disabled>
							Select a category
						</option>
						<option value="Technology">Technology</option>
						<option value="Home">Home</option>
						<option value="Vehicles">Vehicles</option>
						<option value="Fashion">Fashion</option>
						<option value="Pets">Pets</option>
					</Select> */}
				</div>
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
				<Button node="button" waves="light" type="submit" onClick={onSubmit}>
					Explore
					<Icon right>category</Icon>
				</Button>{" "}
			</form>
		</div>
	);
}

export default Explore;
