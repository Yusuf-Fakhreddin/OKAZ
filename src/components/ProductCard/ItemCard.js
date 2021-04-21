import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./ItemCard.scss";
const ItemCard = ({ product }) => {
	return (
		<NavLink activeStyle="none" to={`/item/${product._id}`}>
			<div className="wrapper">
				<div class="itemCard">
					<div class="card-header">
						<img src={product.image} alt="rover" />
					</div>
					<div class="card-body">
						<span class="tag tag-teal">{product.category}</span>
						<h4>{product.productName}</h4>
						{/* <p class="truncate3">{product.description}</p> */}
						<div class="user">
							<div class="user-info">
								{/* <h3>{product.ownerName}</h3> */}
								<h3>Yusuf Abdelraouf</h3>
								<h5>{product.city}</h5>
								{/* <small>{product.updatedAt}</small> */}
							</div>
							<div>
								<h2 className="price">{product.price} EGP</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default ItemCard;
