import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
	listMyFavorites,
	removeFromFavorites,
} from "../../../actions/favoritesActions";
import Header from "../../Header/Header";
import ItemCard from "../../ProductCard/ItemCard";
import { Row, Col } from "react-materialize";

const FavoritesPage = () => {
	const favoritesList = useSelector((state) => state.favoritesList);
	const { favorites, loading, success } = favoritesList;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	const history = useHistory();
	useEffect(() => {
		if (!userInfo) history.push("/");
		dispatch(listMyFavorites());
	}, [userInfo]);

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
				) : !favorites ? (
					<h1>You have no favorites yet</h1>
				) : (
					<Row>
						{favorites.map((product) => (
							<Col key={product._id} sm={3} md={4} lg={4} xl={4}>
								<ItemCard key={product.product} product={product} />
							</Col>
						))}
					</Row>
				)}
			</div>
		</div>
	);
};

export default FavoritesPage;
