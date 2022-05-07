import Roact from "@rbxts/roact";

import Card, { CardHeader } from "components/Card";
import GameList from "./GameList";
import GamePreview from "./GamePreview";
import { CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants";

export default function Games() {
	return (
		<Card
			page="Home"
			align="left"
			index={3}
			getStyle={(theme) => theme.games}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, 0)}
		>
			<CardHeader text="Games" getColor={(theme) => theme.title.foreground} />
			<frame ClipsDescendants Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
				<GameList />
				<GamePreview />
			</frame>
		</Card>
	);
}
