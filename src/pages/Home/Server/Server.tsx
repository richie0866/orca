import Roact from "@rbxts/roact";

import Card, { CardHeader } from "components/Card";
import { CARD_HEIGHT_50, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Server() {
	return (
		<Card
			getStyle={(theme) => theme.server}
			index={0}
			page={Page.Home}
			align="right"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(1, 0, 1, 0)}
		>
			<CardHeader text="Server" getColor={(theme) => theme.server.foreground} />
		</Card>
	);
}
