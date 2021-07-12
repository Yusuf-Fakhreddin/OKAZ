import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommended, listProducts } from "../../../actions/productActions";
import { Row, Col } from "react-materialize";

import Header from "../../Header/Header";
import ItemCard from "../../ProductCard/ItemCard";
import Explore from "../Forms/Explore";
import Search from "../Forms/Search";

const HomePage = () => {
	// introducing dispatch Hook
	const dispatch = useDispatch();
	// selecting part of the state
	const productList = useSelector((state) => state.productList);
	// destructing the state part into its elements
	const { loading, error, products } = productList;

	const recommendation = useSelector((state) => state.recommendation);
	// destructing the state part into its elements
	const {
		loading: recommendLoading,
		error: recommendError,
		products: recommendproducts,
	} = recommendation;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		document.title = "Okaz";
		console.log(userInfo);
		if (userInfo) {
			dispatch(getRecommended());
		} else {
			dispatch(listProducts(6));
		}
	}, [dispatch, userInfo]);

	return (
		<div className="bg">
			<Header />
			<div className="container">
				<h3>What are you looking for ?</h3>
				<div className="search">
					<Search className="section" />

					<Explore className="section" />
				</div>
				<h2>
					{userInfo && recommendproducts.length !== 6
						? "Recommended for you"
						: "Latest Ads"}
				</h2>
				{loading || recommendLoading ? (
					<div className="loader"></div>
				) : error ? (
					<h1 className="error">{error}</h1>
				) : recommendError && !products ? (
					<h1 className="error">{recommendError}</h1>
				) : (
					<Row>
						{userInfo && recommendproducts
							? recommendproducts.map((product) => (
									<Col key={product._id} sm={3} md={4} lg={4} xl={4}>
										<ItemCard product={product} />
									</Col>
							  ))
							: !userInfo &&
							  products &&
							  products.map((product) => (
									<Col key={product._id} sm={3} md={4} lg={4} xl={4}>
										<ItemCard product={product} />
									</Col>
							  ))}
					</Row>
				)}
			</div>
		</div>
	);
};

export default HomePage;
