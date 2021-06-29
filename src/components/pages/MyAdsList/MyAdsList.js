import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteProduct } from "../../../actions/productActions";
import { listMyProducts } from "../../../actions/productActions";
import Header from "../../Header/Header";

import { Table, Icon, Button, Modal, ProgressBar } from "react-materialize";
import { toastFailure, toastSuccess } from "../../Toast/MyToast";

const MyAdsList = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.myProducts);
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
		document.title = "My Ads";
		console.log(products);
		if (!userInfo) {
			history.push("/login");
		} else {
			dispatch(listMyProducts());
		}
		console.log(error);
	}, [dispatch, history, userInfo, pageNumber, successDelete]);

	useEffect(() => {
		if (errorDelete) {
			toastFailure(errorDelete);
		} else if (successDelete) {
			toastSuccess("Item Removed Successfuly");
		}
	}, [loadingDelete]);

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
				<h2>My Ads</h2>

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
					<h1 className="error">{error}</h1>
				) : (
					<div className="container">
						<Table hoverable responsive className="responsive-table">
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
												<Button>
													<Icon>edit</Icon>
												</Button>
											</NavLink>
										</td>
										<td>
											<Button
												className="modal-trigger"
												href="#modal1"
												node="button"
												onClick={() => deleteHandler(product._id)}
											>
												<Icon>delete</Icon>
											</Button>
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

export default MyAdsList;
