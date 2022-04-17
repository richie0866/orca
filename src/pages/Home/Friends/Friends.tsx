import Roact from "@rbxts/roact";

import Card, { CardHeader } from "components/Card";
import { CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Friends() {
	return (
		<Card
			index={3}
			align="left"
			getStyle={(theme) => theme.friends}
			page={Page.Home}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, 0)}
		>
			<CardHeader text="Friend Activity" getColor={(theme) => theme.title.foreground} />
		</Card>
	);
}
