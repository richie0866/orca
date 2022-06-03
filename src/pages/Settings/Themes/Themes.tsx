import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants/app";

export default function Themes() {
	return (
		<Card.Root
			name="themes"
			page="Settings"
			order={2}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, 0)}
		>
			<Card.Body />
		</Card.Root>
	);
}
