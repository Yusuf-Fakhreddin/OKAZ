import React from "react";
import { MediaBox } from "react-materialize";
const MyMediaBox = ({ image, width, height }) => {
	return (
		<MediaBox
			id="MediaBox_7"
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
