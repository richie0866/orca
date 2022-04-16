import Roact from "@rbxts/roact";

import TitleText from "./TitleText";
import { CARD_INNER_MARGIN, VERSION_TAG } from "constants";

export default function TitleContent() {
	return (
		<>
			<TitleText
				id={0}
				text="Orca"
				font="GothamBlack"
				size={20}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN)}
			/>
			<TitleText
				id={1}
				text={VERSION_TAG}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 40)}
			/>
			<TitleText
				id={2}
				text="By 0866"
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 63)}
				transparency={0.15}
			/>
			<TitleText
				id={3}
				text="New rewrite!"
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 86)}
				transparency={0.3}
			/>
			<TitleText
				id={4}
				text="richie0866/orca"
				position={new UDim2(0, CARD_INNER_MARGIN, 1, -CARD_INNER_MARGIN - 16)}
				transparency={0.45}
			/>
		</>
	);
}
