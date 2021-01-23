import React from "react";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../Forms/Search";
const HomePage = () => {
	return (
		<>
			<Header />
			<div className="homePage container">
				<h1>What are you looking for ?</h1>
				<Search />
				<h2>Latest Ads</h2>
				<div className="cards">
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
			</div>
		</>
	);
};

export default HomePage;
