import Roact from "@rbxts/roact";

import Card from "components/Card";
import TitleArt from "./TitleArt";
import TitleContent from "./TitleContent";
import { CARD_HEIGHT_25, CARD_HEIGHT_75, CARD_MARGIN, CARD_WIDTH } from "constants";
import { Page } from "store/pages";

export default function Title() {
	return (
		<Card
			index={0}
			align="left"
			getStyle={(theme) => theme.title}
			page={Page.Home}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, 0, 1, -CARD_HEIGHT_75 - CARD_MARGIN)}
		>
			{/* Title art */}
			<TitleArt />

			{/* Content */}
			<TitleContent />
		</Card>
	);
}
