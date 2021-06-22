import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Header/Header";
import { Icon, MediaBox, Button } from "react-materialize";

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
					<p className="red-text">{error}</p>
				) : (
					<>
						{" "}
						<div className="section">
							<NavLink to="/">
								<Button>
									<Icon>arrow_back</Icon>
								</Button>
							</NavLink>
							{userInfo &&
								(userInfo._id === product.owner || userInfo.isAdmin) && (
									<div className="section">
										<NavLink to={`/product/${product._id}/edit`}>
											<Button className="itemBtn" large>
												<Icon>edit_note</Icon>
											</Button>
										</NavLink>
										<Button
											className="itemBtn"
											large
											onClick={() => deleteHandler(product._id)}
										>
											<Icon>delete_outline</Icon>
										</Button>
										<Button
											className="itemBtn"
											large
											onClick={() => toggleFavorites()}
										>
											<Icon>{star ? "favorite" : "favorite_border"}</Icon>
										</Button>
									</div>
								)}
						</div>
						<div className="ad">
							<div>
								<MediaBox
									className="row"
									id="MediaBox_7"
									options={{
										inDuration: 275,
										onCloseEnd: null,
										onCloseStart: null,
										onOpenEnd: null,
										onOpenStart: null,
										outDuration: 200,
									}}
								>
									<img alt="" src={product.image} width="650" />
								</MediaBox>
								<div className="section ">
									<div className="row container">
										<h2 className="header">{product.productName}</h2>
										<h3 className="header">
											<small>Price:</small> {product.price} EGP
										</h3>
										<h4 className="header">
											<small>City: </small>
											{product.city}
										</h4>
										<h4 className="header">
											<small>Owner Name:</small> {product.ownerName}
										</h4>
										<h4 className="header">
											<small>Owner Phone Number:</small>{" "}
											{product.ownerPhoneNumber}
										</h4>
										<h4 className="header">
											<small>Condition:</small> {product.condition}
										</h4>
										<h4 className="header">
											<small>Category:</small> {product.category}
										</h4>
										{product.updatedAt && (
											<h6 className="header">
												Last Updated: {product.updatedAt.split("T")[0]}
											</h6>
										)}
										<p className="grey-text text-darken-3 lighten-3">
											{product.description}
										</p>
									</div>
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
