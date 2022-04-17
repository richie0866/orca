import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_50, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Shortcuts() {
	return (
		<Card
			index={1}
			align="left"
			getStyle={(theme) => theme.shortcuts}
			page={Page.Settings}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, 0, 1, 0)}
		/>
	);
}
