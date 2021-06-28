import React from "react";
import { NavLink } from "react-router-dom";
import "./ItemCard.scss";
import { Card, CardTitle } from "react-materialize";

const ItemCard = ({ product }) => {
	console.log(product.image);
	return (
		<div>
			<Card
				className="newCard"
				// closeIcon={<Icon>close</Icon>}
				header={
					<NavLink to={`/item/${product._id}`}>
						<CardTitle image={product.image} waves="light" />{" "}
					</NavLink>
				}
				// reveal={<p>{product.description}</p>}
				// revealIcon={<Icon>more_vert</Icon>}
			>
				<div className="card-content">
					<span className="card-title truncate">{product.productName}</span>
					<h5>{product.price} EGP</h5>
					<p>
						{product.city} - {product.condition}
					</p>
					<p>{product.category}</p>
				</div>

				{/* <div class="card-action">
					<NavLink to={`/item/${product._id}`}>See More</NavLink>{" "}
				</div> */}
			</Card>
		</div>
	);
};

export default ItemCard;
