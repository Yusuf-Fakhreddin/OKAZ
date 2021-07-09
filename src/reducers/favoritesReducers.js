import {
	FAVORITES_LIST_REQUEST,
	FAVORITES_LIST_SUCCESS,
	FAVORITES_LIST_FAIL,
	FAVORITES_ADD_REQUEST,
	FAVORITES_ADD_SUCCESS,
	FAVORITES_ADD_FAIL,
	FAVORITES_ADD_RESET,
	FAVORITES_REMOVE_REQUEST,
	FAVORITES_REMOVE_SUCCESS,
	FAVORITES_REMOVE_FAIL,
	FAVORITES_LIST_RESET,
} from "../constants/favoritesConstants";

export const favorites = (state = { favorites: [] }, action) => {
	switch (action.type) {
		case FAVORITES_LIST_SUCCESS:
			return { favorites: action.payload };
		case FAVORITES_REMOVE_REQUEST:
			return {
				favorites: state.favorites.filter((f) => f._id !== action.payload),
			};
		default:
			return state;
	}
};

export const favoritesListReducer = (state = { favorites: [] }, action) => {
	switch (action.type) {
		case FAVORITES_LIST_REQUEST:
			return { loading: true, favorites: [] };
		case FAVORITES_LIST_SUCCESS:
			return { loading: false, favorites: action.payload, success: true };
		case FAVORITES_LIST_FAIL:
			return { loading: false, error: action.payload };
		case FAVORITES_LIST_RESET:
			return { favorites: [] };

		default:
			return state;
	}
};

export const favoritesAddReducer = (state = {}, action) => {
	switch (action.type) {
		case FAVORITES_ADD_REQUEST:
			return { loading: true };
		case FAVORITES_ADD_SUCCESS:
			return { loading: false, success: true, favorites: action.payload };
		case FAVORITES_ADD_FAIL:
			return { loading: false, error: action.payload };
		case FAVORITES_ADD_RESET:
			return {};
		default:
			return state;
	}
};

export const favoritesRemoveReducer = (state = {}, action) => {
	switch (action.type) {
		case FAVORITES_REMOVE_REQUEST:
			return { loading: true };
		case FAVORITES_REMOVE_SUCCESS:
			return { loading: false, success: true };
		case FAVORITES_REMOVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
