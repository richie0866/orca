import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import Border from "components/Border";
import Canvas from "components/Canvas";
import { useTheme } from "hooks/use-theme";
import { px } from "utils/udim2";

const AVATAR = `https://www.roblox.com/headshot-thumbnail/image?userId=${Players.LocalPlayer.UserId}&width=150&height=150&format=png`;

function Avatar() {
	const theme = useTheme("home").profile;
	return (
		<Canvas anchor={new Vector2(0.5, 0)} size={px(186, 186)} position={new UDim2(0.5, 0, 0, 24)}>
			<imagelabel
				Image={AVATAR}
				Size={px(150, 150)}
				Position={px(18, 18)}
				BackgroundColor3={theme.avatar.background}
				BackgroundTransparency={theme.avatar.transparency}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</imagelabel>

			<Border size={4} radius="circular">
				<uigradient
					Color={theme.avatar.gradient.color}
					Transparency={theme.avatar.gradient.transparency}
					Rotation={theme.avatar.gradient.rotation}
				/>
			</Border>
		</Canvas>
	);
}

export default hooked(Avatar);
