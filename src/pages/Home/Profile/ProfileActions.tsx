import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import ProfileSlider from "./components/ProfileSlider";
import ProfileSwitch from "./components/ProfileSwitch";
import { CARD_INNER_MARGIN } from "constants";

function ProfileActions() {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} ClipsDescendants>
			<ProfileSlider
				index={0}
				key="flightspeed"
				text="Flight"
				units="studs/s"
				min={0}
				max={100}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 368)}
			/>
			<ProfileSlider
				index={1}
				key="walkspeed"
				text="Speed"
				units="studs/s"
				min={0}
				max={200}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 368 + 69)}
			/>
			<ProfileSlider
				index={2}
				key="jumpheight"
				text="Jump"
				units="studs"
				min={0}
				max={500}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 368 + 138)}
			/>

			<ProfileSwitch
				index={3}
				key="respawn"
				icon="rbxassetid://8992253511"
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 575)}
			/>
			<ProfileSwitch
				index={4}
				key="ghostmode"
				icon="rbxassetid://8992253792"
				position={new UDim2(0, CARD_INNER_MARGIN + 72, 0, 575)}
			/>
			<ProfileSwitch
				index={5}
				key="godmode"
				icon="rbxassetid://8992253678"
				position={new UDim2(0, CARD_INNER_MARGIN + 145, 0, 575)}
			/>
			<ProfileSwitch
				index={6}
				key="freecam"
				icon="rbxassetid://8992253933"
				position={new UDim2(0, CARD_INNER_MARGIN + 217, 0, 575)}
			/>
		</frame>
	);
}

export default pure(ProfileActions);
