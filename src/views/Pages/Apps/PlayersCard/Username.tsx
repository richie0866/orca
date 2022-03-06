import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import Canvas from "components/Canvas";
import { useAppSelector } from "hooks/common/rodux-hooks";
import { useTheme } from "hooks/use-theme";
import { px, scale } from "utils/udim2";

function Username() {
	const theme = useTheme("apps").players;
	const playerSelected = useAppSelector((state) =>
		state.dashboard.apps.playerSelected !== undefined
			? (Players.FindFirstChild(state.dashboard.apps.playerSelected) as Player | undefined)
			: undefined,
	);

	return (
		<Canvas anchor={new Vector2(0.5, 0)} size={px(278, 49)} position={new UDim2(0.5, 0, 0, 231)}>
			<textlabel
				Font="GothamBlack"
				Text={playerSelected ? playerSelected.DisplayName : "N/A"}
				TextSize={20}
				TextColor3={theme.foreground}
				TextXAlignment="Center"
				TextYAlignment="Top"
				Size={scale(1, 1)}
				BackgroundTransparency={1}
			/>
			<textlabel
				Font="GothamBold"
				Text={playerSelected ? playerSelected.Name : "Select a player"}
				TextSize={16}
				TextColor3={theme.foreground}
				TextXAlignment="Center"
				TextYAlignment="Bottom"
				TextTransparency={0.7}
				Size={scale(1, 1)}
				BackgroundTransparency={1}
			/>
		</Canvas>
	);
}

export default hooked(Username);
