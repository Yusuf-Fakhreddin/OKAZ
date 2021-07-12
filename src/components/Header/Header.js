import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { Icon, Navbar, NavItem, Dropdown, Divider } from "react-materialize";

import Logo from "./logoeng.png";

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};
	return (
		<>
			<Navbar
				className="bg-primary"
				centerChildren
				alignLinks="right"
				brand={
					<NavLink className="brand-logo logo" to="/">
						<img src={Logo} alt="Okaz" />
					</NavLink>
				}
				id="mobile-nav"
				menuIcon={<Icon>menu</Icon>}
				options={{
					draggable: true,
					edge: "left",
					inDuration: 250,
					onCloseEnd: null,
					onCloseStart: null,
					onOpenEnd: null,
					onOpenStart: null,
					outDuration: 200,
					preventScrolling: true,
				}}
			>
				{userInfo ? (
					<Dropdown
						className=".hide-on-small-only"
						id="Dropdown_6"
						options={{
							alignment: "left",
							autoTrigger: true,
							closeOnClick: true,
							constrainWidth: true,
							container: null,
							coverTrigger: false,
							hover: false,
							inDuration: 150,
							onCloseEnd: null,
							onCloseStart: null,
							onOpenEnd: null,
							onOpenStart: null,
							outDuration: 250,
						}}
						trigger={
							<a>
								{userInfo.name} <Icon right>arrow_drop_down</Icon>
							</a>
						}
					>
						<NavLink to="/profile">Profile</NavLink>
						<NavLink to="/myAds">My Ads</NavLink>
						<NavLink to="/favorites">My Favorites</NavLink>
						{userInfo && userInfo.isAdmin && (
							<>
								<Divider />

								<NavLink to="/admin/userList">All Users</NavLink>
								<NavLink to="/admin/adsList">All Ads</NavLink>
							</>
						)}
					</Dropdown>
				) : (
					<>
						<NavLink to="/login">Login</NavLink>
					</>
				)}

				<NavLink to="/placeAd">Place Ad</NavLink>
				{userInfo && <NavItem onClick={logoutHandler}>Logout</NavItem>}
			</Navbar>
		</>
	);
};

export default Header;
