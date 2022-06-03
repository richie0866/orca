import Roact from "@rbxts/roact";

import Card from "components/Card";
import SessionCaptions from "./SessionCaptions";
import { CARD_HEIGHT_25, CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants/app";

export default function Session() {
	return (
		<Card.Root
			name="session"
			page="Home"
			order={2}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, -CARD_HEIGHT_50 - CARD_MARGIN)}
		>
			<Card.Body />
			<Card.Caption text="Session" />
			<SessionCaptions />
		</Card.Root>
	);
}
