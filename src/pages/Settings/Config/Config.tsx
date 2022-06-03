import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_25, CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants/app";

export default function Config() {
	return (
		<Card.Root
			name="config"
			page="Settings"
			order={0}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, 0, 1, -CARD_HEIGHT_50 - CARD_MARGIN)}
		>
			<Card.Body />
		</Card.Root>
	);
}
