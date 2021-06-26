import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Header/Header";
import { Icon, MediaBox, Button, Row, Col } from "react-materialize";
import { toastFailure, toastSuccess } from "../../Toast/MyToast";
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
import { toast } from "react-toastify";

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
			if (addError) {
				setStar(false);
				console.log(addSuccess);
				toastFailure(addError);
			} else {
				toastSuccess("Item was added to your favorites list");
			}
		} else {
			dispatch(removeFromFavorites(match.params.id));
			setStar(false);

			console.log("dispatched remove");
			if (removeError) {
				setStar(!star);
				toastFailure(removeError);
			} else toastSuccess("Item was removed from your favorites list");
		}
	};

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
		if (userInfo) {
			dispatch(listMyFavorites());
			console.log("lol");
			console.log(favorites ? true : false);
		}

		console.log(match.params);
		console.log(product);
		console.log(userInfo);
	}, [match, dispatch, userInfo]);

	useEffect(() => {
		console.log(favorites.length);
		if (favorites.length > 0)
			for (let i = 0; i < favorites.length; i++) {
				console.log(favorites[i]._id);
				if (favorites[i]._id === match.params.id) {
					console.log("exists");
					setStar(true);
				}
			}
	}, [favorites.length]);
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
						<div>
							<h3>{product.productName}</h3>
							<Row>
								<Col m={6}>
									<MediaBox
										// className="row"
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
										<img
											alt=""
											src={product.image}
											width="100%"
											max-height="450px"
										/>
									</MediaBox>
								</Col>
								<Col m={6}>
									<div>
										<h3>
											<small>Price:</small> {product.price} EGP
										</h3>
										<h4>
											<small>City: </small>
											{product.city}
										</h4>
										<h4>
											<small>Owner Name:</small> {product.ownerName}
										</h4>
										<h4>
											<small>Owner Phone Number:</small>{" "}
											{product.ownerPhoneNumber}
										</h4>
										<h4>
											<small>Condition:</small> {product.condition}
										</h4>
										<h4>
											<small>Category:</small> {product.category}
										</h4>
										{product.updatedAt && (
											<h6>Last Updated: {product.updatedAt.split("T")[0]}</h6>
										)}
										<p className="grey-text text-darken-3 lighten-3">
											<strong>Description</strong> <br></br>
											{product.description}
										</p>
									</div>
								</Col>
							</Row>
						</div>{" "}
					</>
				)}
			</div>
		</div>
	);
};

export default ItemPage;
