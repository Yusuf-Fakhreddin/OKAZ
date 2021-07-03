import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.scss";
import FavoritesPage from "./components/pages/Favorites/FavoritesPage";
import PlaceAd from "./components/pages/Forms/PlaceAd";
import LoginPage from "./components/pages/Forms/LoginPage";
import RegisterationPage from "./components/pages/Forms/RegisterationPage";
import ProductPage from "./components/pages/ProductPage/ProductPage";
import HomePage from "./components/pages/homePage/HomePage";
import ProfilePage from "./components/pages/Forms/ProfilePage";
import AdUpdatePage from "./components/pages/AdUpdatePage.js/AdUpdatePage";
import MyAdsList from "./components/pages/MyAdsList/MyAdsList";
import SearchPage from "./components/pages/ExplorePage/SearchPage";
import GA4React, { useGA4React } from "ga-4-react";

// lazy loading of admin functionalities
const UserListPage = React.lazy(() =>
	import("./components/pages/userListPage/UserListPage")
);
const UserEditPage = React.lazy(() =>
	import("./components/pages/UserEditPage/UserEditPage")
);
const AdsListPage = React.lazy(() =>
	import("./components/pages/AdsListPage/AdsListPage")
);

function App() {
	const ga = useGA4React();
	useEffect(() => {
		console.log(ga);
	}, [ga]);

	return (
		<Router>
			<ToastContainer />
			<Switch>
				<Route path="/register" component={RegisterationPage} />

				<Route path="/login" component={LoginPage} />

				<Route path="/placeAd" component={PlaceAd} />

				<Route path="/item/:id" component={ProductPage} />

				<Route path="/favorites">
					<FavoritesPage />
				</Route>
				<Route path="/product/:id/edit" component={AdUpdatePage} />
				<Route path="/myAds" component={MyAdsList} />

				<Route
					path="/search/:productName/:city?/:pageNumber?"
					component={SearchPage}
				/>
				<Route
					path={[
						"/explore/:category//:pageNumber?",
						"/explore/:category/:city?/:pageNumber?",
					]}
					component={SearchPage}
				/>

				<Route path="/profile" component={ProfilePage} />
				{/* Admin */}

				<Route
					path="/admin/userlist/:pageNumber?"
					render={() => (
						<Suspense fallback={<div className="loader"></div>}>
							{" "}
							<UserListPage />{" "}
						</Suspense>
					)}
				/>

				<Route
					path="/admin/adsList/:pageNumber?"
					render={() => (
						<Suspense fallback={<div className="loader"></div>}>
							{" "}
							<AdsListPage />{" "}
						</Suspense>
					)}
				/>
				<Route
					path="/admin/user/:id/edit"
					render={() => (
						<Suspense fallback={<div className="loader"></div>}>
							{" "}
							<UserEditPage />{" "}
						</Suspense>
					)}
				/>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
