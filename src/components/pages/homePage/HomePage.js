import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../actions/productActions";

import Header from "../../Header/Header";
import ItemCard from "../../ProductCard/ItemCard";
import CategoriesSearch from "../Forms/Categories";
import Explore from "../Forms/Explore";
import Search from "../Forms/Search";

const HomePage = () => {
	// introducing dispatch Hook
	const dispatch = useDispatch();
	// selecting part of the state
	const productList = useSelector((state) => state.productList);
	// destructing the state part into its elements
	const { loading, error, products } = productList;

	useEffect(() => {
		document.title = "Okaz";

		// firing the listProducts Action
		dispatch(listProducts(6));
		console.log(products);
	}, [dispatch]);

	return (
		<>
			<Header />
			<div className="homePage container">
				<h1>What are you looking for ?</h1>
				<Search />
				<Explore />
				<h2>Latest Ads</h2>
				{loading ? (
					<div className="loader"> </div>
				) : error ? (
					<h1 className="error">{error}</h1>
				) : (
					<div className="cards">
						{products.map((product) => (
							<ItemCard key={product._id} product={product} />
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default HomePage;
