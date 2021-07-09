import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
	listMyFavorites,
	removeFromFavorites,
} from "../../../actions/favoritesActions";
import Header from "../../Header/Header";
import { NavLink } from "react-router-dom";
import { Icon, Button, Table } from "react-materialize";
import { toastFailure, toastSuccess } from "../../Toast/MyToast";
import MyMediaBox from "../../MyMediaBox/MyMediaBox";
const FavoritesPage = () => {
	const favoritesList = useSelector((state) => state.favoritesList);
	const { loading, success } = favoritesList;

	const favTotal = useSelector((state) => state.favoritesTotal);
	const { favorites } = favTotal;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	const history = useHistory();
	useEffect(() => {
		if (!userInfo) history.push("/");
		if (favorites.length === 0 && !success) dispatch(listMyFavorites());
		console.log(favorites);
	}, [dispatch, userInfo]);

	const removeFromfavoritesHandler = (id) => {
		dispatch(removeFromFavorites(id));
	};
	return (
		<div className="">
			<Header />
			<div className="container homePage">
				<h2>Your Favorites</h2>
				{loading ? (
					<div className="loader"></div>
				) : success && favorites.length === 0 ? (
					<h1>You have no favorites yet</h1>
				) : (
					<Table hoverable responsive className="responsive-table">
						<thead>
							<tr>
								<th>Image</th>
								<th>Name</th>
								<th>Phone Number</th>
								<th>Price (EGP)</th>
								<th>City</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{success &&
								favorites.map((product) => (
									<tr key={product._id}>
										<td>
											<MyMediaBox
												image={product.image}
												width="50px"
												height="50px"
											/>
										</td>
										<td>
											<NavLink to={"item/" + product._id}>
												{product.productName}
											</NavLink>
										</td>
										<td>{product.ownerPhoneNumber}</td>
										<td>{product.price}</td>
										<td>{product.city}</td>
										<td>
											<Button
												onClick={() => removeFromfavoritesHandler(product._id)}
											>
												<Icon> favorite </Icon>
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				)}
			</div>
		</div>
	);
};

export default FavoritesPage;
