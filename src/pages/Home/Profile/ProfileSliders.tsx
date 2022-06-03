import Roact from "@rbxts/roact";

import ProfileSlider from "./components/ProfileSlider";
import { CARD_INNER_MARGIN } from "constants/app";

export default function ProfileSliders() {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} ClipsDescendants>
			<ProfileSlider
				order={0}
				name="flightspeed"
				text="Flight"
				tooltip="🕊️ Enable CFrame flight"
				tooltipAlignment="right"
				units="studs/s"
				min={0}
				max={100}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 369)}
			/>
			<ProfileSlider
				order={1}
				name="walkspeed"
				text="Speed"
				tooltip="🐇 Change your walking speed"
				tooltipAlignment="right"
				units="studs/s"
				min={0}
				max={200}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 433)}
			/>
			<ProfileSlider
				order={2}
				name="jumpheight"
				text="Jump"
				tooltip="🦘 Change your jump height"
				tooltipAlignment="right"
				units="studs"
				min={0}
				max={500}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 497)}
			/>
		</frame>
	);
}
