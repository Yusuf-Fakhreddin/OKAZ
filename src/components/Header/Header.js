import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/userActions";

import Logo from "./logo.png";

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};
	return (
		<nav className="header">
			<div className="container ">
				<div className="nav">
					<div className="logo">
						<NavLink
							activeStyle={{ textDecoration: "none", color: "inherit" }}
							to="/"
						>
							<img src={Logo} alt="Logo" />
						</NavLink>
					</div>
					<div className="menu">
						{userInfo ? (
							<>
								<NavLink to="/profile">
									{" "}
									<h2>{userInfo.name}</h2>
								</NavLink>
								<NavLink to="/myAds">
									{" "}
									<h2>My Ads</h2>
								</NavLink>
								<h2 onClick={logoutHandler}>Logout</h2>{" "}
							</>
						) : (
							<>
								<NavLink to="login">
									<h2>SignIn</h2>
								</NavLink>
							</>
						)}
						{userInfo && userInfo.isAdmin && (
							<>
								<NavLink to="/admin/userList">
									<h2>Users</h2>
								</NavLink>
								<NavLink to="/admin/adsList">
									<h2>All Ads</h2>
								</NavLink>
							</>
						)}
						<NavLink to="/placeAd">
							<h2>Place Ad</h2>
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
