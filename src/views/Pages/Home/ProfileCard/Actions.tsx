import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import ActionButton from "components/ActionButton";
import Canvas from "components/Canvas";
import { useTheme } from "hooks/use-theme";
import { px } from "utils/udim2";

function Actions() {
	const theme = useTheme("home").profile;
	return (
		<Canvas anchor={new Vector2(0.5, 0)} size={px(278, 49)} position={new UDim2(0.5, 0, 0, 575)}>
			<ActionButton
				action="refresh"
				hint="<font face='GothamBlack'>Refresh</font> your character at this location"
				theme={theme}
				image="rbxassetid://8992253511"
				position={px(0, 0)}
			/>
			<ActionButton
				action="ghost"
				hint="<font face='GothamBlack'>Spawn a ghost</font> and go to it when disabled"
				theme={theme}
				image="rbxassetid://8992253792"
				position={px(72, 0)}
				canDeactivate
			/>
			<ActionButton
				action="godmode"
				hint="<font face='GothamBlack'>Set godmode</font>, may break respawn"
				theme={theme}
				image="rbxassetid://8992253678"
				position={px(145, 0)}
			/>
			<ActionButton
				action="freecam"
				hint="<font face='GothamBlack'>Set freecam</font>, use Q & E to move vertically"
				theme={theme}
				image="rbxassetid://8992253933"
				position={px(217, 0)}
				canDeactivate
			/>
		</Canvas>
	);
}

export default hooked(Actions);
