import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromfavorites } from "../../../actions/favoritesActions";
import Header from "../../Header/Header";
import ItemCard from "../../ProductCard/ItemCard";

const FavoritesPage = () => {
	const favorites = useSelector((state) => state.favorites);
	const { favoritesItems } = favorites;
	const dispatch = useDispatch();

	const removeFromfavoritesHandler = (id) => {
		dispatch(removeFromfavorites(id));
	};
	return (
		<div className="">
			<Header />
			<div className="container">
				<h2>Your Favorites</h2>
				{favoritesItems.length === 0 ? (
					<h1>You have no favorites yet</h1>
				) : (
					<div className="cards">
						{/* item.product is the ID of the product we make it key for list */}
						{favoritesItems.map((item) => (
							<ItemCard key={item.product} product={item} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoritesPage;
