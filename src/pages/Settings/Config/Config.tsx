import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_25, CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Config() {
	return (
		<Card
			getStyle={(theme) => theme.config}
			index={0}
			page={Page.Settings}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, 0, 1, -CARD_HEIGHT_50 - CARD_MARGIN)}
		/>
	);
}
