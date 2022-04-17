import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_75, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Players() {
	return (
		<Card
			index={0}
			align="left"
			getStyle={(theme) => theme.players}
			page={Page.Apps}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_75)}
			position={new UDim2(0, 0, 1, 0)}
		/>
	);
}
