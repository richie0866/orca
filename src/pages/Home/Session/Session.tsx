import Roact from "@rbxts/roact";

import Card, { CardHeader } from "components/Card";
import { CARD_HEIGHT_25, CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Session() {
	return (
		<Card
			index={2}
			align="left"
			getStyle={(theme) => theme.session}
			page={Page.Home}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, -CARD_HEIGHT_50 - CARD_MARGIN)}
		>
			<CardHeader text="Session" getColor={(theme) => theme.server.foreground} />
		</Card>
	);
}
