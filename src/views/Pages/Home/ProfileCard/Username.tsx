import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import Canvas from "components/Canvas";
import { useTheme } from "hooks/use-theme";
import { px, scale } from "utils/udim2";

function Username() {
	const theme = useTheme("home").profile;
	return (
		<Canvas anchor={new Vector2(0.5, 0)} size={px(278, 49)} position={new UDim2(0.5, 0, 0, 231)}>
			<textlabel
				Font="GothamBlack"
				Text={Players.LocalPlayer.DisplayName}
				TextSize={20}
				TextColor3={theme.foreground}
				TextXAlignment="Center"
				TextYAlignment="Top"
				Size={scale(1, 1)}
				BackgroundTransparency={1}
			/>
			<textlabel
				Font="GothamBold"
				Text={Players.LocalPlayer.Name}
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
