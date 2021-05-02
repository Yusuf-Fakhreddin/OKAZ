import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteProduct } from "../../../actions/productActions";
import { listMyProducts } from "../../../actions/productActions";
import Header from "../../Header/Header";

import "../userListPage/UserListPage.scss";

const MyAdsList = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.myProducts);
	const { loading, error, products, page, pages } = productList;
	// const productDelete = useSelector((state) => state.productDelete);
	// const {
	// 	loading: loadingDelete,
	// 	error: errorDelete,
	// 	success: successDelete,
	// } = productDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		console.log(products);
		if (!userInfo) {
			history.push("/login");
		} else {
			dispatch(listMyProducts());
		}
		console.log(error);
	}, [dispatch, history, userInfo, pageNumber]);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteProduct(id));
		}
	};
	return (
		<>
			<Header />
			<div className="container">
				<h2>My Ads</h2>
				{loading ? (
					<div className="loader"></div>
				) : error ? (
					<h1 className="error">{error}</h1>
				) : (
					<div className="container">
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Phone Number</th>
									<th>Price</th>
									<th>City</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td>
											<NavLink to={"item/" + product._id}>
												{product.productName}
											</NavLink>
										</td>
										<td>{product.ownerPhoneNumber}</td>
										<td>${product.price}</td>
										<td>{product.city}</td>

										<td>
											<NavLink to={`/product/${product._id}/edit`}>
												<button className="delete">
													<i className="fas fa-edit"></i>
												</button>
											</NavLink>
										</td>
										<td>
											<button
												className="delete"
												onClick={() => deleteHandler(product._id)}
											>
												<i className="fas fa-trash"></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
};

export default MyAdsList;