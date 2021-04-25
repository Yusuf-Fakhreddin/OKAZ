import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.scss";
import FavoritesPage from "./components/pages/Favorites/FavoritesPage";
import ItemForm from "./components/pages/Forms/ItemForm";
import LoginPage from "./components/pages/Forms/LoginPage";
import RegisterationPage from "./components/pages/Forms/RegisterationPage";
import ItemPage from "./components/pages/ItemPage/ItemPage";
import HomePage from "./components/pages/homePage/HomePage";
import ProfilePage from "./components/pages/Forms/ProfilePage";
import UserListPage from "./components/pages/userListPage/UserListPage";
import UserEditPage from "./components/pages/UserEditPage.js/UserEditPage";
import AdsListPage from "./components/pages/AdsListPage/AdsListPage";
import AdUpdatePage from "./components/pages/AdUpdatePage.js/AdUpdatePage";
import MyAdsList from "./components/pages/MyAdsList/MyAdsList";
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/register" component={RegisterationPage} />

				<Route path="/login" component={LoginPage} />

				<Route path="/placeAd" component={ItemForm} />

				<Route path="/item/:id" component={ItemPage} />

				<Route path="/favorites">
					<FavoritesPage />
				</Route>
				<Route path="/product/:id/edit" component={AdUpdatePage} />
				<Route path="/myAds" component={MyAdsList} />

				<Route path="/profile" component={ProfilePage} />
				<Route path="/admin/userlist" component={UserListPage} />
				<Route path="/admin/adsList" component={AdsListPage} />
				<Route path="/admin/user/:id/edit" component={UserEditPage} />
			</Switch>
		</Router>
	);
}

export default App;
