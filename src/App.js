import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import RegisterationPage from "./pages/Forms/RegisterationPage";
import LoginPage from "./pages/Forms/LoginPage";
import ItemForm from "./pages/Forms/ItemForm";
import HomePage from "./pages/homePage/HomePage";
import ItemPage from "./pages/ItemPage/ItemPage";
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/register">
					<RegisterationPage />
				</Route>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/additem">
					<ItemForm />
				</Route>
				<Route path="/item/:id">
					<ItemPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
