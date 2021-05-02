import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_RESET,
	MY_PRODUCT_LIST_REQUEST,
	MY_PRODUCT_LIST_SUCCESS,
	MY_PRODUCT_LIST_FAIL,
	PRODUCT_SEARCH_REQUEST,
	PRODUCT_SEARCH_SUCCESS,
	PRODUCT_SEARCH_FAIL,
} from "../constants/productConstants";
// actions reducer for every phase of the axios request
export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productSearchReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_SEARCH_REQUEST:
			return { loading: true, products: [] };
		case PRODUCT_SEARCH_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_SEARCH_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const myProductsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case MY_PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };
		case MY_PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case MY_PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

// action reducer for every phase of the axios request
export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return { loading: true };
		case PRODUCT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case PRODUCT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case PRODUCT_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const productUpdateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return { loading: true };
		case PRODUCT_UPDATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case PRODUCT_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_UPDATE_RESET:
			return { product: {} };
		default:
			return state;
	}
};
