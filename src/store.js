import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	favorites,
	favoritesAddReducer,
	favoritesListReducer,
	favoritesRemoveReducer,
} from "./reducers/favoritesReducers";
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	myProductsReducer,
	productSearchReducer,
	productListAllReducer,
	recommendationReducer,
	myAds,
	allAds,
} from "./reducers/productReducers";
import {
	allUsers,
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from "./reducers/userReducers";
import optimist from "redux-optimist";

const reducer = optimist(
	combineReducers({
		// part of the state : its reducer
		productList: productListReducer,
		productAllList: productListAllReducer,
		recommendation: recommendationReducer,
		productDetails: productDetailsReducer,
		productDelete: productDeleteReducer,
		productCreate: productCreateReducer,
		productUpdate: productUpdateReducer,
		userLogin: userLoginReducer,
		userRegister: userRegisterReducer,
		userDetails: userDetailsReducer,
		userUpdateProfile: userUpdateProfileReducer,
		userList: userListReducer,
		userDelete: userDeleteReducer,
		userUpdate: userUpdateReducer,
		myProducts: myProductsReducer,
		productSearch: productSearchReducer,
		favoritesList: favoritesListReducer,
		favoritesAdd: favoritesAddReducer,
		favoritesRemove: favoritesRemoveReducer,
		favoritesTotal: favorites,
		myAdsTotal: myAds,
		allUsersTotal: allUsers,
		allAdsTotal: allAds,
	})
);

// initializing the userinfo state from what's saved in local storage or nothing
const userInfoFromStorage = localStorage.getItem("UserInfo")
	? JSON.parse(localStorage.getItem("UserInfo"))
	: null;
const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
