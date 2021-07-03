import React from "react";
import { MediaBox } from "react-materialize";
const MyMediaBox = ({ image, width, height, caption }) => {
	return (
		<MediaBox
			id="MediaBox_7"
			caption={caption}
			options={{
				inDuration: 275,
				onCloseEnd: null,
				onCloseStart: null,
				onOpenEnd: null,
				onOpenStart: null,
				outDuration: 200,
			}}
		>
			<img alt="Ad" src={image} width={width} height={height} />
		</MediaBox>
	);
};

export default MyMediaBox;
