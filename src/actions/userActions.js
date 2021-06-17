import { FAVORITES_LIST_RESET } from "../constants/favoritesConstants";
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_REQUEST,
	USER_LOGOUT,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_DETAILS_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
} from "../constants/userConstants";
import http from "../htppService";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await http.post(
			"https://okazapp.herokuapp.com/api/users/login",
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem("UserInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("UserInfo");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: USER_LIST_RESET });
	dispatch({ type: USER_LIST_RESET });
	dispatch({ type: FAVORITES_LIST_RESET });
};

export const registerUser = (name, email, password, phoneNumber) => async (
	dispatch
) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await http.post(
			"https://okazapp.herokuapp.com/api/users",
			{ name, email, password, phoneNumber },
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem("UserInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
		console.log(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		);
	}
};

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/users/${id}`,
			config
		);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.put(
			`https://okazapp.herokuapp.com/api/users/profile`,
			user,
			config
		);

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.get(
			`https://okazapp.herokuapp.com/api/users`,
			config
		);

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await http.delete(`/users/${id}`, config);

		dispatch({
			type: USER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await http.put(
			`https://okazapp.herokuapp.com/api/users/${user._id}`,
			user,
			config
		);

		dispatch({
			type: USER_UPDATE_SUCCESS,
		});
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
