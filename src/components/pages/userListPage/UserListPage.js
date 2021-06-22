import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { listUsers, deleteUser } from "../../../actions/userActions";
import Header from "../../Header/Header";
import { Table, Icon, Preloader } from "react-materialize";
const UserListPage = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, successDelete, userInfo]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteUser(id));
		}
	};
	return (
		<>
			<Header />
			<div className="container">
				<h2>Users</h2>
				{loading ? (
					<div className="loader"></div>
				) : error ? (
					<p className="red-text">{error}</p>
				) : (
					<div className="container">
						<Table bordered hoverable responsive className="responsive-table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Email</th>
									<th>Admin</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user._id}>
										<td>{user._id}</td>
										<td>{user.name}</td>
										<td>
											<a href={`mailto:${user.email}`}>{user.email}</a>
										</td>
										<td className="admin">
											{user.isAdmin ? (
												<Icon>check_circle_outline</Icon>
											) : (
												<Icon>highlight_off</Icon>
											)}
										</td>

										<td>
											<NavLink to={`/admin/user/${user._id}/edit`}>
												<button>
													<Icon>edit</Icon>
												</button>
											</NavLink>
										</td>
										<td>
											<button onClick={() => deleteHandler(user._id)}>
												<Icon>delete</Icon>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				)}
			</div>
		</>
	);
};

export default UserListPage;
