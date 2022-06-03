import Roact from "@rbxts/roact";

import ProfileSlider from "./components/ProfileSlider";
import { CARD_INNER_MARGIN } from "constants/app";

export default function ProfileSliders() {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} ClipsDescendants>
			<ProfileSlider
				index={0}
				key="flightspeed"
				text="Flight"
				units="studs/s"
				min={0}
				max={100}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 369)}
			/>
			<ProfileSlider
				index={1}
				key="walkspeed"
				text="Speed"
				units="studs/s"
				min={0}
				max={200}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 433)}
			/>
			<ProfileSlider
				index={2}
				key="jumpheight"
				text="Jump"
				units="studs"
				min={0}
				max={500}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 497)}
			/>
		</frame>
	);
}
