import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "../../Header/Header";
import Explore from "../Forms/Explore";
import Search from "../Forms/Search";
import { searchProducts } from "../../../actions/productActions";
import ItemCard from "../../ProductCard/ItemCard";
import { Row, Col } from "react-materialize";
import Paginate from "../../Paginate/Paginate";

const SearchPage = () => {
	const dispatch = useDispatch();
	const Params = useParams();
	const pageNumber = Params.pageNumber || 1;
	const productList = useSelector((state) => state.productSearch);
	const { loading, error, products, pages, page } = productList;

	useEffect(() => {
		console.log(Params);
		dispatch(
			searchProducts({
				productName: Params.productName,
				city: Params.city,
				category: Params.category,
				pageNumber,
			})
		);
		console.log(products);
	}, [Params]);

	return (
		<>
			<Header />
			<div className="container homePage">
				<div className="search">
					<Search
						className="section"
						city={Params.city}
						productName={Params.productName}
					/>
					<Explore
						className="section"
						category={Params.category}
						city={Params.city}
					/>
				</div>
				{loading ? (
					<div className="loader"> </div>
				) : error ? (
					<h1 className="error">{error}</h1>
				) : !products.length ? (
					<h4>Sorry, no ads matching your search</h4>
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
				<Paginate
					Link={`/${Params.productName ? "search" : "explore"}/${
						Params.productName ? Params.productName : Params.category
					}${Params.city ? "/" + Params.city : "/"}`}
					pages={pages}
					page={page}
				/>
			</div>
		</>
	);
};

export default SearchPage;
