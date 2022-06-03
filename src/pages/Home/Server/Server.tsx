import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_50, CARD_WIDTH } from "constants/app";

export default function Server() {
	return (
		<Card.Root
			name="server"
			page="Home"
			order={0}
			align="right"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(1, 0, 1, 0)}
		>
			<Card.Body />
			<Card.Caption text="Server" />
		</Card.Root>
	);
}
