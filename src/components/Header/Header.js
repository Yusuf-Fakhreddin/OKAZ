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
					<a className="brand-logo logo" href="/">
						<img src={Logo} alt="Okaz" />
					</a>
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
						<NavItem href="/profile">Profile</NavItem>
						<NavItem href="/myAds">My Ads</NavItem>
						<NavItem href="/favorites">My Favorites</NavItem>
						{userInfo && userInfo.isAdmin && (
							<>
								<Divider />

								<NavItem href="/admin/userList">All Users</NavItem>
								<NavItem href="/admin/adsList">All Ads</NavItem>
							</>
						)}
					</Dropdown>
				) : (
					<>
						<NavItem href="/login">Login</NavItem>
					</>
				)}

				<NavItem href="/placeAd">Place Ad</NavItem>
				{userInfo && <NavItem onClick={logoutHandler}>Logout</NavItem>}
			</Navbar>
		</>
	);
};

export default Header;
