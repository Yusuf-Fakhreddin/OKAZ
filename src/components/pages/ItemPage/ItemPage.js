import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Header/Header";
import "../../../styles/ItemPage.scss";

import {
	deleteProduct,
	listProductsDetails,
} from "../../../actions/productActions";
import { NavLink } from "react-router-dom";
import { GA4R } from "ga-4-react";
import {
	addToFavorites,
	listMyFavorites,
	removeFromFavorites,
} from "../../../actions/favoritesActions";

const ItemPage = ({ match, history }) => {
	const [star, setStar] = useState(false);

	const favoritesList = useSelector((state) => state.favoritesList);
	const { favorites, success } = favoritesList;

	const favoritesAdd = useSelector((state) => state.favoritesAdd);
	const { success: addSuccess, error: addError } = favoritesAdd;

	const favoritesRemove = useSelector((state) => state.favoritesRemove);
	const { success: removeSuccess, error: removeError } = favoritesRemove;
	const dispatch = useDispatch();

	const toggleFavorites = () => {
		if (!star) {
			dispatch(addToFavorites(match.params.id));
			setStar(true);
			if (!addSuccess || addError) {
				setStar(false);
				console.log(addSuccess);
			}
		} else {
			dispatch(removeFromFavorites(match.params.id));
			setStar(false);
			console.log("dispatched remove");
			if (!removeSuccess || removeError) setStar(!star);
		}
	};

	// introducing dispatch Hook
	// const dispatch = useDispatch();
	// selecting part of the state
	const ProductsDetails = useSelector((state) => state.productDetails);
	// destructing the state part into its elements
	const { loading, error, product } = ProductsDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteProduct(id));
		}
		history.push("/");
	};

	useEffect(() => {
		document.title = "Item Details";

		// firing the listProductsDetails Action
		dispatch(listProductsDetails(match.params.id));
		console.log(match.params);
		console.log(product);
		console.log(userInfo);
	}, [match, dispatch]);

	useEffect(() => {
		console.log(favorites);
		if (!favorites && userInfo) {
			dispatch(listMyFavorites());
		}
		for (let i = 0; i < favorites.length; i++) {
			if (favorites[i]._id === product._id) {
				console.log(favorites[i].productName, product.productName);
				setStar(true);
				console.log(star);
				break;
			} else {
				setStar(false);
			}
		}
	}, [product]);
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
							{userInfo &&
								(userInfo._id === product.owner || userInfo.isAdmin) && (
									<div className="admin-buttons">
										<NavLink to={`/product/${product._id}/edit`}>
											<button className="edit-button">
												<i className="far fa-edit"></i>
											</button>
										</NavLink>
										<button className="delete-button">
											<i
												onClick={() => deleteHandler(product._id)}
												className="fas fa-trash"
											></i>
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
								)}
						</div>
						<div className="ad">
							<div className="item-info">
								<div>
									<h1>{product.productName}</h1>
									<h2>
										{product.city}{" "}
										{/* <small>
											date added:{" "}
											{product ? product.updatedAt.split("T")[0] : null}
										</small>{" "} */}
									</h2>
								</div>
								<h1 className="price">{product.price} EGP</h1>
							</div>
							<div className="img-contact">
								<img src={product.image} alt="Product Image" />
								<div className="side">
									<h1>{product.ownerName}</h1>
									<h2>{product.ownerPhoneNumber}</h2>
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
