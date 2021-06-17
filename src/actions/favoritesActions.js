// import axios from "axios";
import http from "../htppService";

import {
	FAVORITES_ADD_FAIL,
	FAVORITES_ADD_REQUEST,
	FAVORITES_ADD_SUCCESS,
	FAVORITES_LIST_FAIL,
	FAVORITES_LIST_REQUEST,
	FAVORITES_LIST_SUCCESS,
	FAVORITES_REMOVE_FAIL,
	FAVORITES_REMOVE_REQUEST,
	FAVORITES_REMOVE_SUCCESS,
} from "../constants/favoritesConstants";
import { logout } from "./userActions";

export const listMyFavorites = () => async (dispatch, getState) => {
	try {
		dispatch({ type: FAVORITES_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/users/fav`,
			config
		);
		dispatch({
			type: FAVORITES_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: FAVORITES_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addToFavorites = (productId) => async (dispatch, getState) => {
	console.log(productId);
	try {
		dispatch({
			type: FAVORITES_ADD_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",

				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await http.post(
			`https://okazapp.herokuapp.com/api/users/fav/${productId}`,
			{},
			config
		);

		dispatch({
			type: FAVORITES_ADD_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			dispatch(logout());
		}
		dispatch({
			type: FAVORITES_ADD_FAIL,
			payload: message,
		});
	}
};

export const removeFromFavorites = (productId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: FAVORITES_REMOVE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await http.delete(
			`https://okazapp.herokuapp.com/api/users/fav/${productId}`,
			config
		);

		dispatch({
			type: FAVORITES_REMOVE_SUCCESS,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			dispatch(logout());
		}
		dispatch({
			type: FAVORITES_REMOVE_FAIL,
			payload: message,
		});
	}
};
