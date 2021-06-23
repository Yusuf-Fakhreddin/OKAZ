import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import GA4React from "ga-4-react";
const ga4react = new GA4React("G-HT0EE0LNMW");

(async () => {
	await ga4react.initialize().then(
		(ga4) => {
			ga4.pageview("path");
			ga4.gtag("event", "pageview", "path"); // or your custom gtag event
		},
		(err) => {
			console.error(err);
		}
	);

	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById("root")
	);
})();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
