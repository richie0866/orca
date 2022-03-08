import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import ActionButton from "components/ActionButton";
import Canvas from "components/Canvas";
import { useTheme } from "hooks/use-theme";
import { px } from "utils/udim2";

function Actions() {
	const theme = useTheme("apps").players;
	return (
		<Canvas anchor={new Vector2(0.5, 0)} size={px(278, 49)} position={new UDim2(0.5, 0, 0, 304)}>
			{/* Teleport to */}
			<ActionButton
				action="teleport"
				hint="<font face='GothamBlack'>Teleport to</font> this player, tap again to cancel"
				theme={theme}
				image="rbxassetid://8992042585"
				position={px(0, 0)}
				canDeactivate
			/>

			{/* Hide character */}
			<ActionButton
				action="hide"
				hint="<font face='GothamBlack'>Hide</font> this player's character; persists between players"
				theme={theme}
				image="rbxassetid://8992042653"
				position={px(72, 0)}
				canDeactivate
			/>

			{/* Tool kill */}
			<ActionButton
				action="kill"
				hint="<font face='GothamBlack'>Kill</font> this player with a tool handle"
				theme={theme}
				image="rbxassetid://8992042471"
				position={px(145, 0)}
			/>

			{/* Spectate player */}
			<ActionButton
				action="spectate"
				hint="<font face='GothamBlack'>Spectate</font> this player"
				theme={theme}
				image="rbxassetid://8992042721"
				position={px(217, 0)}
				canDeactivate
			/>
		</Canvas>
	);
}

export default hooked(Actions);
