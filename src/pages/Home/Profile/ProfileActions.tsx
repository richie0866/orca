import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import ProfileSlider from "./components/ProfileSlider";
import ProfileSwitch, { SWITCH_PADDING, SWITCH_WIDTH } from "./components/ProfileSwitch";
import { CARD_INNER_MARGIN } from "constants/app";

function ProfileActions() {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} ClipsDescendants>
			{/* Center sliders */}
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

			{/* Bottom action switches */}
			<ProfileSwitch
				index={0}
				key="respawn"
				icon="rbxassetid://8992253511"
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 568)}
			/>
			<ProfileSwitch
				index={1}
				key="ghostmode"
				icon="rbxassetid://8992253792"
				position={new UDim2(0, CARD_INNER_MARGIN + SWITCH_WIDTH + SWITCH_PADDING, 0, 568)}
			/>
			<ProfileSwitch
				index={2}
				key="godmode"
				icon="rbxassetid://8992253678"
				position={new UDim2(0, CARD_INNER_MARGIN + SWITCH_WIDTH * 2 + SWITCH_PADDING * 2, 0, 568)}
			/>
			<ProfileSwitch
				index={3}
				key="freecam"
				icon="rbxassetid://8992253933"
				position={new UDim2(0, CARD_INNER_MARGIN + SWITCH_WIDTH * 3 + SWITCH_PADDING * 3, 0, 568)}
			/>
		</frame>
	);
}

export default pure(ProfileActions);
