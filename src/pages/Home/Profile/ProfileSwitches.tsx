import Roact from "@rbxts/roact";

import ProfileSwitch, { SWITCH_PADDING, SWITCH_WIDTH } from "./components/ProfileSwitch";
import { CARD_INNER_MARGIN } from "constants/app";

const switchOffsets = [
	CARD_INNER_MARGIN,
	CARD_INNER_MARGIN + SWITCH_WIDTH + SWITCH_PADDING,
	CARD_INNER_MARGIN + SWITCH_WIDTH * 2 + SWITCH_PADDING * 2,
	CARD_INNER_MARGIN + SWITCH_WIDTH * 3 + SWITCH_PADDING * 3,
];

export default function ProfileSwitches() {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} ClipsDescendants>
			<ProfileSwitch
				order={0}
				name="respawn"
				tooltip="🔃 Respawn at your current position"
				tooltipAlignment="left"
				icon="rbxassetid://8992253511"
				position={new UDim2(0, switchOffsets[0], 0, 568)}
			/>
			<ProfileSwitch
				order={1}
				name="ghostmode"
				tooltip="👻 Spawns a ghost character\n🎯 Tap again to move to it"
				icon="rbxassetid://8992253792"
				position={new UDim2(0, switchOffsets[1], 0, 568)}
			/>
			<ProfileSwitch
				order={2}
				name="godmode"
				tooltip="💀 Enable godmode\n⚠️ May break reloading!"
				icon="rbxassetid://8992253678"
				position={new UDim2(0, switchOffsets[2], 0, 568)}
			/>
			<ProfileSwitch
				order={3}
				name="freecam"
				tooltip="📷 Enable freecam"
				tooltipAlignment="right"
				icon="rbxassetid://8992253933"
				position={new UDim2(0, switchOffsets[3], 0, 568)}
			/>
		</frame>
	);
}
