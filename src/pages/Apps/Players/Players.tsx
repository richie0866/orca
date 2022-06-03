import Roact from "@rbxts/roact";

import Card from "components/Card";
import { CARD_HEIGHT_75, CARD_WIDTH } from "constants/app";

export default function Players() {
	return (
		<Card.Root
			name="players"
			page="Apps"
			order={0}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_75)}
			position={new UDim2(0, 0, 1, 0)}
		>
			<Card.Body />
		</Card.Root>
	);
}
