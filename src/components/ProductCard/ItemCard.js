import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./ItemCard.scss";
const ItemCard = ({ product }) => {
	console.log(product.image);
	return (
		<NavLink to={`/item/${product._id}`}>
			<div className="wrapper">
				<div className="itemCard">
					<div className="card-header">
						<img src={product.image} alt="rover" />
					</div>
					<div className="card-body">
						<span className="tag ">{product.category}</span>
						<h3>{product.productName}</h3>
						{/* <p className="truncate3">{product.description}</p> */}
						<div className="user-info">
							{/* <h3>{product.ownerName}</h3> */}
							<h4>{product.ownerName}</h4>
							<h4>{product.city} </h4>
							{product.condition && <h4> Condition: {product.condition}</h4>}
							{/* <small>{product.updatedAt}</small> */}
						</div>
						<div>
							<h2 className="price">{product.price} EGP</h2>
						</div>
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default ItemCard;
