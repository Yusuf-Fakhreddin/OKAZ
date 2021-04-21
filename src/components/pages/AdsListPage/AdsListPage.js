import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteProduct, listProducts } from "../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../constants/productConstants";
import Header from "../../Header/Header";

import "../userListPage/UserListPage.scss";

const AdsListPage = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;
	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		console.log(products);
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo || !userInfo.isAdmin) {
			history.push("/login");
		} else {
			dispatch(listProducts("", pageNumber));
		}
	}, [dispatch, history, userInfo, successDelete, pageNumber]);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteProduct(id));
		}
	};
	return (
		<>
			<Header />
			<div className="container">
				<h2>Ads</h2>
				{loading ? (
					<div className="loader"></div>
				) : error ? (
					<h1 className="error">{error}</h1>
				) : (
					<div className="container">
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Price</th>
									<th>Category</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.productName}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>

										<td>
											<NavLink to={`/admin/product/${product._id}/edit`}>
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

export default AdsListPage;
