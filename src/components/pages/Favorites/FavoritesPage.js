import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
	listMyFavorites,
	removeFromFavorites,
} from "../../../actions/favoritesActions";
import Header from "../../Header/Header";
import ItemCard from "../../ProductCard/ItemCard";

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
					<div className="cards">
						{/* item.product is the ID of the product we make it key for list */}
						{favorites.map((item) => (
							<ItemCard key={item.product} product={item} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoritesPage;
