import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./ItemPage.scss";

import Img from "./Er3mmA_XcAI-mI1.jfif";

const ItemPage = () => {
	const [star, setStar] = useState(false);

	const Clicked = () => {
		setStar(!star);
	};
	return (
		<div className="item-page">
			<Header />
			<div className="container">
				<div className="btns">
					<button className="back-button">
						<i className="fas fa-arrow-left fa-lg"></i>
					</button>
					<div className="admin-buttons">
						<button className="edit-button">
							<i className="far fa-edit"></i>
						</button>
						<button className="delete-button">
							<i className="fas fa-trash"></i>
						</button>
						<button className="delete-button" onClick={() => Clicked()}>
							<i className="material-icons">{star ? "star" : "star_border"}</i>
						</button>
					</div>
				</div>
				<div className="ad">
					<div className="item-info">
						<div>
							<h1>Item Name</h1>
							<h2>
								City <small>date added</small>{" "}
							</h2>
						</div>
						<h1 className="price">Price</h1>
					</div>
					<div className="img-contact">
						<div
							className="img"
							style={{ backgroundImage: `url(${Img})` }}
						></div>
						<div className="side">
							<h1>Owner Name</h1>
							<h2>0111******</h2>
							<h3>Item Description</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
								temporibus nihil neque magni cum voluptates vitae possimus totam
								modi unde, sed, sit, incidunt atque doloribus?
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemPage;
