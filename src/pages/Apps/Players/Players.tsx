import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_75, CARD_WIDTH } from "constants";

export default function Players() {
	return (
		<Card
			page="Apps"
			align="left"
			index={0}
			getStyle={(theme) => theme.players}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_75)}
			position={new UDim2(0, 0, 1, 0)}
		/>
	);
}
