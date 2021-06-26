import React from "react";
import { Pagination, Icon } from "react-materialize";
import { useHistory } from "react-router";
const Paginate = ({ pages, page, Link }) => {
	const history = useHistory();
	const navigate = (value) => {
		console.log(value);
		history.push(`${Link}/${value}`);
	};
	return (
		// pages > 1 && (
		<Pagination
			activePage={page}
			items={pages}
			onSelect={(value) => navigate(value)}
			leftBtn={<Icon>chevron_left</Icon>}
			rightBtn={<Icon>chevron_right</Icon>}
		/>
		// )
	);
};

export default Paginate;
