import Roact from "@rbxts/roact";

import Card from "components/Card";
import TitleBackground from "./TitleBackground";
import TitleCaptions from "./TitleCaptions";
import { CARD_HEIGHT_25, CARD_HEIGHT_75, CARD_MARGIN, CARD_WIDTH } from "constants/app";

export default function Title() {
	return (
		<Card.Root
			name="title"
			page="Home"
			order={0}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, 0, 1, -CARD_HEIGHT_75 - CARD_MARGIN)}
		>
			<Card.Body />
			<Card.Caption text="Orca" delayMs={200} />
			<TitleBackground />
			<TitleCaptions />
		</Card.Root>
	);
}
