import React from "react";
import { NavLink } from "react-router-dom";
import "./Categories.scss";
const CategoriesSearch = () => {
	return (
		<>
			<h1>Explore by category</h1>
			<div className="categoriesSearch">
				<NavLink to="/technology">
					<h1>Technology</h1>
				</NavLink>
				<NavLink to="/vehicles">
					<h1>Vehicles</h1>
				</NavLink>
				<NavLink to="/Fashion">
					<h1>Fashion</h1>
				</NavLink>{" "}
				<NavLink to="/home">
					<h1>Home</h1>
				</NavLink>{" "}
				<NavLink to="/pets">
					<h1>Pets</h1>
				</NavLink>
			</div>
		</>
	);
};

export default CategoriesSearch;
