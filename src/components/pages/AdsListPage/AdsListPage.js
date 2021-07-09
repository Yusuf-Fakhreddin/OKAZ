import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import {
	deleteProduct,
	listAllProducts,
} from "../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../constants/productConstants";
import Header from "../../Header/Header";
import { Table, Icon, Button, Modal } from "react-materialize";
import Paginate from "../../Paginate/Paginate";
import MyMediaBox from "../../MyMediaBox/MyMediaBox";

const AdsListPage = () => {
	const history = useHistory();

	const Params = useParams();
	const pageNumber = Params.pageNumber || 1;

	const dispatch = useDispatch();

	const allAdsTotal = useSelector((state) => state.allAdsTotal);
	const { products } = allAdsTotal;

	const productList = useSelector((state) => state.productAllList);
	const { loading, error, pages, page } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		document.title = "All Ads";
		console.log(products);
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo) history.push("/login");
		else if (!userInfo.isAdmin) history.push("/");
		else dispatch(listAllProducts(pageNumber));
	}, [dispatch, history, userInfo, pageNumber]);

	const [selectedDeletion, setselectedDeletion] = useState(null);

	const deleteHandler = (id) => {
		setselectedDeletion(id);
		// if (window.confirm("Are you sure")) {
		// 	dispatch(deleteProduct(id));
		// }
	};

	return (
		<>
			<Header />
			<div className="container">
				<h2>Ads</h2>
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

				{loading ? (
					<div className="loader"></div>
				) : error ? (
					<p className="red-text">{error}</p>
				) : (
					<div>
						<Table hoverable responsive className="responsive-table">
							<thead>
								<tr>
									<th>Image</th>
									<th>Product Name</th>
									<th>Owner Name</th>
									<th>Phone Number</th>
									<th>Price (EGP)</th>
									<th>Category</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td>
											{" "}
											<MyMediaBox
												image={product.image}
												height="50px"
												width="50px"
												caption={product.productName}
											/>{" "}
										</td>
										<td>
											<NavLink to={"/item/" + product._id}>
												{product.productName}
											</NavLink>
										</td>
										<td>{product.ownerName} </td>
										<td>{product.ownerPhoneNumber}</td>
										<td>{product.price}</td>
										<td>{product.category}</td>

										<td>
											<NavLink to={`/product/${product._id}/edit`}>
												<Button>
													<Icon>edit</Icon>
												</Button>
											</NavLink>
										</td>
										<td>
											<Button
												onClick={() => deleteHandler(product._id)}
												className="modal-trigger"
												href="#modal1"
												node="button"
											>
												<Icon>delete</Icon>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Paginate Link="/admin/adsList" pages={pages} page={page} />
					</div>
				)}
			</div>
		</>
	);
};

export default AdsListPage;
