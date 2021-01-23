import React, { useState } from "react";
import "./ProductCard.scss";
const ProductCard = () => {
	const [star, setStar] = useState(false);

	const Clicked = () => {
		setStar(!star);
	};
	return (
		<div className="card">
			<div className="wrapper">
				<div className="cardContainer">
					<div
						className="top"
						style={{
							backgroundImage: `url(https://source.unsplash.com/random)`,
						}}
					></div>
					<div className={`bottom ${star ? "clicked" : null} `}>
						<div className="left">
							<div className="details">
								<h1 className="truncate1">ChairChairChairChairChairChair</h1>
								<p>£250 - tanta</p>
							</div>
							<div className="buy" onClick={() => Clicked()}>
								<i className="material-icons">
									{star ? "star" : "star_border"}
								</i>
							</div>
						</div>
						{/* <div className="right">
							<div className="done">
								<i className="material-icons">star</i>
							</div>
							<div className="details">
								<h1>Item</h1>
								<p>Added to your favorties</p>
							</div>
							<div className="remove" onClick={() => Clicked()}>
								<i className="material-icons">star_border</i>
							</div>
						</div> */}
					</div>
				</div>
				<div className="inside">
					<div className="icon">
						<i className="material-icons">info_outline</i>
					</div>
					<div className="contents truncate15">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
						culpa aliquid recusandae est, maiores voluptas! Lorem ipsum dolor
						sit amet consectetur adipisicing elit. Assumenda culpa aliquid
						recusandae est, maiores voluptas! Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Assumenda culpa aliquid recusandae
						est, maiores voluptas! Lorem ipsum dolor, sit amet consectetur
						adipisicing elit. Culpa, obcaecati expedita eveniet omnis
						repudiandae itaque atque hic maxime similique repellat amet corrupti
						pariatur, ullam molestias et, tempora rem quibusdam! Cupiditate
						suscipit facilis veritatis et dolorum magnam sunt consequuntur esse
						perspiciatis! Animi tempora est, veritatis assumenda libero odio
						voluptas? Praesentium rem quas atque nam facilis tenetur accusantium
						neque laborum dolores, sequi nesciunt quibusdam dolorum, at unde
						modi voluptate voluptatibus similique? Hic sunt nulla ducimus, rem
						vero laboriosam quam fugit delectus magnam praesentium vel alias
						doloribus suscipit est voluptatem quia corrupti incidunt
						consequatur. Perferendis, porro officiis. Cumque, voluptate cum.
						Cupiditate odio, quos, adipisci quaerat necessitatibus odit, quis
						delectus quo repellat possimus nihil laboriosam! Officia eius
						eligendi quas nobis corporis commodi, animi nostrum dolores omnis?
						Aliquid perspiciatis harum voluptas quam? Maiores consectetur
						voluptatum delectus, excepturi, sapiente incidunt autem suscipit
						impedit, velit rerum assumenda? Nisi unde possimus, eum, nihil
						neque, ab mollitia in odit delectus temporibus quaerat consequuntur
						ea excepturi nobis facilis deserunt voluptatum voluptatibus voluptas
						laboriosam accusantium? Harum quisquam perferendis natus
						exercitationem, reiciendis error distinctio doloribus nemo fuga
						explicabo earum corporis similique voluptate possimus beatae. Minima
						dolores, aliquam repudiandae molestias nisi alias dignissimos
						reprehenderit dolore tenetur incidunt quaerat eveniet doloremque est
						delectus impedit eos nesciunt esse eius voluptatem natus, et
						expedita odio quam quia. Dolorem consequatur sit sunt at, molestias
						enim possimus architecto maiores tempora assumenda quia a, id
						quaerat officiis, asperiores aliquam quos adipisci optio ad deserunt
						nulla cumque. Blanditiis error accusamus, nihil ad eaque adipisci
						praesentium natus dicta, ut ab maiores repellat libero accusantium
						earum aspernatur eligendi itaque, doloremque mollitia ullam
						voluptatum. Voluptatibus voluptas repudiandae pariatur asperiores
						voluptates animi reiciendis, nobis dignissimos ipsam quia quisquam
						ipsum officia inventore odit saepe excepturi similique!
						Necessitatibus impedit alias qui doloribus molestiae quos maiores ex
						quis inventore, vel earum atque neque explicabo magni cumque quasi
						tempore consequatur sequi asperiores soluta aut amet minima veniam?
						Tempore reiciendis error odio perferendis eum a non incidunt
						eligendi consequatur, delectus dolorem sint rem inventore ipsa eaque
						ducimus eius voluptas? Tempora labore itaque soluta sit autem
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
