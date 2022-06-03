import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_50, CARD_WIDTH } from "constants/app";

export default function Shortcuts() {
	return (
		<Card.Root
			name="shortcuts"
			page="Settings"
			order={1}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, 0, 1, 0)}
		>
			<Card.Body />
		</Card.Root>
	);
}
