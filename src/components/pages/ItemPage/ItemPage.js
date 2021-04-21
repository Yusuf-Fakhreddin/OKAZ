import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Header/Header";
import "../../../styles/ItemPage.scss";

import Img from "./Er3mmA_XcAI-mI1.jfif";
import { listProductsDetails } from "../../../actions/productActions";
import { NavLink } from "react-router-dom";

const ItemPage = ({ match, history }) => {
	const [star, setStar] = useState(false);

	const toggleFavorites = () => {
		setStar(!star);
	};

	// introducing dispatch Hook
	const dispatch = useDispatch();
	// selecting part of the state
	const ProductsDetails = useSelector((state) => state.productDetails);
	// destructing the state part into its elements
	const { loading, error, product } = ProductsDetails;

	useEffect(() => {
		// firing the listProductsDetails Action
		dispatch(listProductsDetails(match.params.id));
		console.log(match.params);
	}, [match, dispatch]);

	return (
		<div className="item-page">
			<Header />
			<div className="container">
				{loading ? (
					<div className="loader"></div>
				) : error ? (
					<h1 className="error">{error}</h1>
				) : (
					<>
						{" "}
						<div className="btns">
							<NavLink to="/">
								<button className="back-button">
									<i className="fas fa-arrow-left fa-lg"></i>
								</button>
							</NavLink>
							<div className="admin-buttons">
								<button className="edit-button">
									<i className="far fa-edit"></i>
								</button>
								<button className="delete-button">
									<i className="fas fa-trash"></i>
								</button>
								<button
									className="delete-button"
									onClick={() => toggleFavorites()}
								>
									<i className="material-icons">
										{star ? "star" : "star_border"}
									</i>
								</button>
							</div>
						</div>
						<div className="ad">
							<div className="item-info">
								<div>
									<h1>{product.productName}</h1>
									<h2>
										{product.city} <small>{product.updatedAt}</small>{" "}
									</h2>
								</div>
								<h1 className="price">{product.price}</h1>
							</div>
							<div className="img-contact">
								<img src={product.image} />
								<div className="side">
									<h1>{product.ownerName}</h1>
									<h2>0111******</h2>
									<h3>Item Description</h3>
									<p>{product.description}</p>
								</div>
							</div>
						</div>{" "}
					</>
				)}
			</div>
		</div>
	);
};

export default ItemPage;
