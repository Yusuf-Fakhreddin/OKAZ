// import axios from "axios";
import http from "../htppService";

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	MY_PRODUCT_LIST_SUCCESS,
	MY_PRODUCT_LIST_FAIL,
	MY_PRODUCT_LIST_REQUEST,
	PRODUCT_SEARCH_REQUEST,
	PRODUCT_SEARCH_SUCCESS,
	PRODUCT_SEARCH_FAIL,
} from "../constants/productConstants";
import { logout } from "./userActions";

// getting last 6 items action
export const listProducts = (cnt) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/products/recent/${cnt}`
		);
		console.log(`https://okazapp.herokuapp.com/api/products/recent/${cnt}`);
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// searchProducts
export const searchProducts = (product) => async (dispatch, getState) => {
	console.log(product);
	try {
		dispatch({ type: PRODUCT_SEARCH_REQUEST });

		console.log(`https://okazapp.herokuapp.com/api/search`);

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await http.post(
			`https://okazapp.herokuapp.com/api/search`,
			product,
			config
		);

		dispatch({
			type: PRODUCT_SEARCH_SUCCESS,
			payload: data,
		});
		console.log(data);
	} catch (error) {
		dispatch({
			type: PRODUCT_SEARCH_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// getting last 6 items action
export const listMyProducts = () => async (dispatch, getState) => {
	try {
		dispatch({ type: MY_PRODUCT_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/users/myProducts`,
			config
		);
		dispatch({
			type: MY_PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MY_PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// getting a single product details
export const listProductsDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/products/${id}`
		);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
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
			`https://okazapp.herokuapp.com/api/products/${id}`,
			config
		);

		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
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
			type: PRODUCT_DELETE_FAIL,
			payload: message,
		});
	}
};

export const createProduct = (product) => async (dispatch, getState) => {
	console.log(product);
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
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
			`https://okazapp.herokuapp.com/api/products`,
			product,
			config
		);

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
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
			type: PRODUCT_CREATE_FAIL,
			payload: message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
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

		const { data } = await http.put(
			`https://okazapp.herokuapp.com/api/products/${product.productId}`,
			product,
			config
		);

		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log(error);
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			dispatch(logout());
		}
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload: message,
		});
	}
};
