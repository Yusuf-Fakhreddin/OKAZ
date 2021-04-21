// import axios from "axios";
import http from "../htppService";

import {
	FAVORITES_ADD_ITEM,
	FAVORITES_REMOVE_ITEM,
} from "../constants/favoritesConstants";

export const addToFavorites = (id, qty) => async (dispatch, getState) => {
	const { data } = await http.get(`/api/products/${id}`);

	dispatch({
		type: FAVORITES_ADD_ITEM,
		// what we want to show from the product in the cart
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			ownerName: data.ownerName,
			description: data.description,
		},
	});
	localStorage.setItem(
		"favoritesItems",
		JSON.stringify(getState().favorites.favoritesItems)
	);
};

export const removeFromfavorites = (id) => (dispatch, getState) => {
	dispatch({
		type: FAVORITES_REMOVE_ITEM,
		payload: id,
	});
	localStorage.setItem(
		"favoritesItems",
		JSON.stringify(getState().favorites.favoritesItems)
	);
};
