import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<nav className="header">
			<div className="container ">
				<NavLink
					activeStyle={{ textDecoration: "none", color: "black" }}
					to="/"
				>
					<h1 className="okaz">OKAZ</h1>
				</NavLink>
			</div>
		</nav>
	);
};

export default Header;
