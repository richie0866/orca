import Roact from "@rbxts/roact";

import Card, { CardHeader } from "components/Card";
import SessionInfo from "./SessionInfo";
import { CARD_HEIGHT_25, CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants/app";

export default function Session() {
	return (
		<Card
			page="Home"
			align="left"
			index={2}
			getStyle={(theme) => theme.session}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, -CARD_HEIGHT_50 - CARD_MARGIN)}
		>
			<CardHeader text="Session" getColor={(theme) => theme.server.foreground} />
			<SessionInfo />
		</Card>
	);
}
