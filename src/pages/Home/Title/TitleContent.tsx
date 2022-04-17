import Roact from "@rbxts/roact";

import TitleText from "./components/TitleText";
import { CARD_INNER_MARGIN, VERSION_TAG } from "constants";
import { CardHeader } from "components/Card";
import { Page } from "store/pages";

export default function TitleContent() {
	return (
		<>
			<CardHeader text="Orca" getColor={(theme) => theme.title.foreground} page={Page.Home} />
			<TitleText
				id={1}
				text={VERSION_TAG}
				transparency={0.2}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 40)}
			/>
			<TitleText
				id={2}
				text="By 0866"
				transparency={0.2}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 63)}
			/>
			<TitleText
				id={3}
				text="New rewrite!"
				transparency={0.2}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 86)}
			/>
			<TitleText
				id={4}
				text="richie0866/orca"
				alignment="Bottom"
				position={new UDim2(0, CARD_INNER_MARGIN, 1, -CARD_INNER_MARGIN)}
				transparency={0.4}
			/>
		</>
	);
}
