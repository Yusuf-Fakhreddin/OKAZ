import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "../../Header/Header";
import Explore from "../Forms/Explore";
import Search from "../Forms/Search";
import { searchProducts } from "../../../actions/productActions";
import ItemCard from "../../ProductCard/ItemCard";
import { Row, Col } from "react-materialize";

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
							<h4>
								{Params.productName && Params.productName}{" "}
								{Params.city && "in " + Params.city}{" "}
								{Params.category && "category: " + Params.category}{" "}
							</h4>
						}
						<Row>
							{products.map((product) => (
								<Col key={product._id} sm={3} md={4} lg={4} xl={4}>
									<ItemCard product={product} />
								</Col>
							))}
						</Row>
					</>
				)}
			</div>
		</>
	);
};

export default SearchPage;
