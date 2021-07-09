// import axios from "axios";
import http from "../httpService";
import { BEGIN, COMMIT, REVERT } from "redux-optimist";

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
	PRODUCT_LIST_ALL_REQUEST,
	PRODUCT_LIST_ALL_SUCCESS,
	PRODUCT_LIST_ALL_FAIL,
	RECOMMENDATION_LIST_REQUEST,
	RECOMMENDATION_LIST_SUCCESS,
	RECOMMENDATION_LIST_FAIL,
} from "../constants/productConstants";
import { logout } from "./userActions";
import { toastFailure, toastSuccess } from "../components/Toast/MyToast";

// getting last 6 items action
export const listProducts = (cnt) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/products/recent/${cnt}`
		);
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

// getting All prodycts action
export const listAllProducts = (pageNumber) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_LIST_ALL_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/products?pageNumber=${pageNumber}`,
			config
		);
		dispatch({
			type: PRODUCT_LIST_ALL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_ALL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// getting Recommended Products
export const getRecommended = () => async (dispatch, getState) => {
	try {
		dispatch({ type: RECOMMENDATION_LIST_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/recommend`,
			config
		);
		dispatch({
			type: RECOMMENDATION_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: RECOMMENDATION_LIST_FAIL,
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
			`https://okazapp.herokuapp.com/api/search?pageNumber=${product.pageNumber}`,
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
let nextTransactionID = 0;

export const deleteProduct = (id) => async (dispatch, getState) => {
	let transactionID = nextTransactionID++;

	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
			payload: id,
			optimist: { type: BEGIN, id: transactionID },
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
			optimist: { type: COMMIT, id: transactionID },
		});
		toastSuccess("ad removed successfully");
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
			optimist: { type: REVERT, id: transactionID },
		});
		toastFailure(message);
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
