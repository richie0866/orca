import Roact from "@rbxts/roact";

import Card from "components/Card";
import TitleArt from "./TitleArt";
import TitleContent from "./TitleContent";
import { CARD_HEIGHT_25, CARD_HEIGHT_75, CARD_MARGIN, CARD_WIDTH } from "constants";

export default function Title() {
	return (
		<Card
			page="Home"
			align="left"
			index={0}
			getStyle={(theme) => theme.title}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, 0, 1, -CARD_HEIGHT_75 - CARD_MARGIN)}
		>
			<TitleArt />
			<TitleContent />
		</Card>
	);
}
