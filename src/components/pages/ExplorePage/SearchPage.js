import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "../../Header/Header";
import Explore from "../Forms/Explore";
import Search from "../Forms/Search";
import { searchProducts } from "../../../actions/productActions";
import ItemCard from "../../ProductCard/ItemCard";

const SearchPage = () => {
	const dispatch = useDispatch();
	const Params = useParams();

	const productList = useSelector((state) => state.productSearch);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(
			searchProducts({
				productName: Params.productName,
				city: Params.city,
				category: Params.category,
			})
		);
		console.log(products);
	}, [Params]);

	return (
		<>
			<Header />
			<div className="container homePage">
				<Search />
				<Explore />
				{loading ? (
					<div className="loader"> </div>
				) : error ? (
					<h1 className="error">{error}</h1>
				) : (
					<>
						{
							<h2>
								Results for {Params.productName}{" "}
								{Params.city && "in " + Params.city}{" "}
								{Params.category && "category: " + Params.category}{" "}
							</h2>
						}
						<div className="cards">
							{products.map((product) => (
								<ItemCard key={product._id} product={product} />
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default SearchPage;
