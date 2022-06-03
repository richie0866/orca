import Roact from "@rbxts/roact";

import Card from "components/Card";
import GameList from "./GameList";
import GamePreview from "./GamePreview";
import { CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH } from "constants/app";

export default function Games() {
	return (
		<Card.Root
			name="games"
			page="Home"
			order={3}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_50)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, 0)}
		>
			<Card.Body />
			<Card.Caption text="Games" />

			<frame ClipsDescendants Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
				<GameList />
				<GamePreview />
			</frame>
		</Card.Root>
	);
}
