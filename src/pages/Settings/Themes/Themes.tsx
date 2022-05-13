import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants/app";

export default function Themes() {
	return (
		<Card
			index={2}
			page="Settings"
			align="left"
			getStyle={(theme) => theme.themes}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, 0)}
		/>
	);
}
