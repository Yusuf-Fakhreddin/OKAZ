import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Header/Header";
import "../../../styles/ItemPage.scss";

import {
	deleteProduct,
	listProductsDetails,
} from "../../../actions/productActions";
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

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteProduct(id));
		}
		history.push("/");
	};

	useEffect(() => {
		// firing the listProductsDetails Action
		dispatch(listProductsDetails(match.params.id));
		console.log(match.params);
		console.log(product);
		console.log(userInfo);
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
										<small>
											date added:{" "}
											{/* {product ? product.updatedAt.split("T")[0] : null} */}
										</small>{" "}
									</h2>
								</div>
								<h1 className="price">{product.price} EGP</h1>
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
