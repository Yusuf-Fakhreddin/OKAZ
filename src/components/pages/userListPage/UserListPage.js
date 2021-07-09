import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { listUsers, deleteUser } from "../../../actions/userActions";
import Header from "../../Header/Header";
import { Table, Icon, Button, Modal } from "react-materialize";
import Paginate from "../../Paginate/Paginate";
const UserListPage = () => {
	const history = useHistory();
	const Params = useParams();
	const pageNumber = Params.pageNumber || 1;
	const dispatch = useDispatch();

	const allUsersTotal = useSelector((state) => state.allUsersTotal);
	const { users } = allUsersTotal;

	const userList = useSelector((state) => state.userList);
	const { loading, error, pages, page } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		document.title = "All Users";

		if (!userInfo) history.push("/login");
		else if (!userInfo.isAdmin) history.push("/");
		else dispatch(listUsers(pageNumber));
	}, [dispatch, history, userInfo, pageNumber]);

	const [selectedDeletion, setselectedDeletion] = useState(null);

	const deleteHandler = (id) => {
		setselectedDeletion(id);

		// if (window.confirm("Are you sure")) {
		// 	dispatch(deleteUser(id));
		// }
	};
	return (
		<>
			<Header />
			<div className="container">
				<h2>Users</h2>
				<Modal
					actions={[]}
					bottomSheet={false}
					fixedFooter={false}
					header="Are You sure ? "
					id="modal1"
					open={false}
					options={{
						dismissible: true,
						endingTop: "10%",
						inDuration: 250,
						onCloseEnd: null,
						onCloseStart: null,
						onOpenEnd: null,
						onOpenStart: null,
						opacity: 0.5,
						outDuration: 250,
						preventScrolling: true,
						startingTop: "4%",
					}}
					// root={[object HTMLBodyElement]}
				>
					<Button
						onClick={() => dispatch(deleteUser(selectedDeletion))}
						className="itemBtn section"
						large
						modal="close"
					>
						Yes
					</Button>
					<Button flat modal="close" node="button" waves="green">
						No
					</Button>
				</Modal>

				{loading ? (
					<div className="loader"></div>
				) : error ? (
					<p className="red-text">{error}</p>
				) : (
					<div>
						<Table hoverable responsive className="responsive-table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Phone Number</th>
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
										<td>{user.phoneNumber}</td>
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
												<Button>
													<Icon>edit</Icon>
												</Button>
											</NavLink>
										</td>
										<td>
											<Button
												onClick={() => deleteHandler(user._id)}
												className="modal-trigger"
												href="#modal1"
												node="button"
											>
												<Icon>delete</Icon>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Paginate Link="/admin/userList" pages={pages} page={page} />
					</div>
				)}
			</div>
		</>
	);
};

export default UserListPage;
