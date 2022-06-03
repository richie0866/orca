import Roact from "@rbxts/roact";

import TitleCaption from "./components/TitleCaption";
import { CARD_INNER_MARGIN } from "constants/app";
import { VERSION_TAG } from "constants/env";

export default function TitleCaptions() {
	return (
		<>
			<TitleCaption
				order={1}
				text={VERSION_TAG}
				transparency={0.2}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 40)}
			/>

			<TitleCaption
				order={2}
				text="By 0866"
				transparency={0.2}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 63)}
			/>

			<TitleCaption
				order={3}
				text="New rewrite!"
				transparency={0.2}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN + 86)}
			/>

			<TitleCaption
				order={4}
				text="richie0866/orca"
				alignment="Bottom"
				position={new UDim2(0, CARD_INNER_MARGIN, 1, -CARD_INNER_MARGIN)}
				transparency={0.4}
			/>
		</>
	);
}
