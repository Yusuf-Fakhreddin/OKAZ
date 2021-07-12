import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Header/Header";
import { Icon, Button, Row, Col, ProgressBar, Modal } from "react-materialize";
import {
	deleteProduct,
	listProductsDetails,
} from "../../../actions/productActions";
import { NavLink, useHistory } from "react-router-dom";
import { GA4R } from "ga-4-react";
import {
	addToFavorites,
	listMyFavorites,
	removeFromFavorites,
} from "../../../actions/favoritesActions";
import MyMediaBox from "../../MyMediaBox/MyMediaBox";

const ItemPage = ({ match }) => {
	const history = useHistory();
	const [star, setStar] = useState(false);

	const favoritesList = useSelector((state) => state.favoritesList);
	const { favorites, success, loading: loadingFavorites } = favoritesList;

	const favoritesAdd = useSelector((state) => state.favoritesAdd);
	const { success: addSuccess, error: addError } = favoritesAdd;

	const favoritesRemove = useSelector((state) => state.favoritesRemove);
	const { success: removeSuccess, error: removeError } = favoritesRemove;
	const dispatch = useDispatch();

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const toggleFavorites = () => {
		if (!star) {
			dispatch(addToFavorites(match.params.id));
			setStar(true);
			if (addError) {
				setStar(false);
			}
		} else {
			dispatch(removeFromFavorites(match.params.id));
			setStar(false);

			if (removeError) {
				setStar(!star);
			}
		}
	};

	// selecting part of the state
	const ProductsDetails = useSelector((state) => state.productDetails);
	// destructing the state part into its elements
	const { loading, error, product } = ProductsDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [selectedDeletion, setselectedDeletion] = useState(null);

	useEffect(() => {
		if (loadingDelete) history.push("/");
	}, [loadingDelete]);

	const deleteHandler = (id) => {
		setselectedDeletion(id);
		// if (window.confirm("Are you sure")) {
		// 	dispatch(deleteProduct(id));
		// }
	};
	useEffect(() => {
		document.title = "Item Details";

		// firing the listProductsDetails Action
		dispatch(listProductsDetails(match.params.id));
		if (userInfo && !success) {
			dispatch(listMyFavorites());
		}
	}, [match, dispatch, userInfo]);

	useEffect(() => {
		if (favorites)
			if (favorites.length > 0)
				for (let i = 0; i < favorites.length; i++) {
					if (favorites[i]._id === match.params.id) {
						setStar(true);
					}
				}
	}, [favorites]);

	let buttons;
	if (userInfo)
		if (userInfo && (userInfo._id === product.owner || userInfo.isAdmin)) {
			buttons = (
				<div className="section">
					<NavLink to={`/product/${product._id}/edit`}>
						<Button className="itemBtn" large>
							<Icon>edit_note</Icon>
						</Button>
					</NavLink>
					<Button
						className="itemBtn modal-trigger"
						large
						href="#modal1"
						node="button"
						onClick={() => deleteHandler(product._id)}
					>
						<Icon>delete_outline</Icon>
					</Button>
					<Button className="itemBtn " large onClick={() => toggleFavorites()}>
						<Icon>
							{loadingFavorites
								? "more_horiz"
								: star
								? "favorite"
								: "favorite_border"}
						</Icon>
					</Button>
				</div>
			);
		} else {
			buttons = (
				<Button className="itemBtn " large onClick={() => toggleFavorites()}>
					<Icon>
						{loadingFavorites
							? "more_horiz"
							: star
							? "favorite"
							: "favorite_border"}
					</Icon>
				</Button>
			);
		}

	return (
		<div className="item-page">
			<Header />
			<div className="container">
				<Modal
					actions={[]}
					bottomSheet={false}
					fixedFooter={false}
					header="Are You sure ? "
					id="modal1"
					open={false}
					options={{
						dismissible: true,
						endingTop: "10%",
						inDuration: 250,
						onCloseEnd: null,
						onCloseStart: null,
						onOpenEnd: null,
						onOpenStart: null,
						opacity: 0.5,
						outDuration: 250,
						preventScrolling: true,
						startingTop: "4%",
					}}
					// root={[object HTMLBodyElement]}
				>
					<Button
						onClick={() => dispatch(deleteProduct(selectedDeletion))}
						className="itemBtn section"
						large
						modal="close"
					>
						Yes
					</Button>
					<Button flat modal="close" node="button" waves="green">
						No
					</Button>
				</Modal>
				{loadingDelete && <ProgressBar />}
				{loading ? (
					<div className="loader"></div>
				) : error ? (
					<p className="red-text">{error}</p>
				) : (
					<>
						{" "}
						<div className="section">
							<Button onClick={() => history.push("/")}>
								<Icon>arrow_back</Icon>
							</Button>
							{buttons}
						</div>
						<div>
							<h3>{product.productName}</h3>
							<Row>
								<Col m={6}>
									<MyMediaBox
										image={product.image}
										width="100%"
										height="auto"
										caption={product.productName}
									/>
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
										{product.description && (
											<p className="grey-text text-darken-3 lighten-3">
												<strong>Description</strong> <br></br>
												{product.description}
											</p>
										)}
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
