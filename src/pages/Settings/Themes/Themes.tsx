import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Themes() {
	return (
		<Card
			getStyle={(theme) => theme.themes}
			index={2}
			page={Page.Settings}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, 0)}
		/>
	);
}
