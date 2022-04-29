import Roact from "@rbxts/roact";

import Card, { CardHeader } from "components/Card";
import { CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Friends() {
	return (
		<Card
			getStyle={(theme) => theme.friends}
			index={3}
			page={Page.Home}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, 0)}
		>
			<CardHeader text="Friend Activity" getColor={(theme) => theme.title.foreground} />
		</Card>
	);
}
