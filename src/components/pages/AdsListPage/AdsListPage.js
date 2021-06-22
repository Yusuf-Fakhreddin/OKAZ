import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteProduct, listProducts } from "../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../constants/productConstants";
import Header from "../../Header/Header";
import { Table, Icon } from "react-materialize";

// import "../userListPage/UserListPage.scss";

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
			dispatch(listProducts());
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
					<div>
						<Table bordered hoverable responsive className="responsive-table">
							<thead>
								<tr>
									<th>Owner Name</th>
									<th>Phone Number</th>
									<th>Price</th>
									<th>Category</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td>
											<NavLink to={"/item/" + product._id}>
												{product.productName}
											</NavLink>
										</td>
										<td>{product.ownerPhoneNumber}</td>
										<td>{product.price} EGP</td>
										<td>{product.category}</td>

										<td>
											<NavLink to={`/product/${product._id}/edit`}>
												<button>
													<Icon>edit</Icon>
												</button>
											</NavLink>
										</td>
										<td>
											<button onClick={() => deleteHandler(product._id)}>
												<Icon>delete</Icon>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				)}
			</div>
		</>
	);
};

export default AdsListPage;
