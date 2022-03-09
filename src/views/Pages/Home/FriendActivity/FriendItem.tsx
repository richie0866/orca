import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
import { Players, TeleportService } from "@rbxts/services";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import { useSpring } from "hooks/common/use-spring";
import { useTheme } from "hooks/use-theme";
import { px, scale } from "utils/udim2";

const FRIEND_SPRING_OPTIONS = { frequency: 6 };

interface Props {
	friend: FriendOnlineInfoGame;
	index: number;
}

function FriendItem({ friend, index }: Props) {
	const theme = useTheme("home").friendActivity.friendButton;
	const [isHovered, setHovered] = useState(false);

	const avatar = `https://www.roblox.com/headshot-thumbnail/image?userId=${friend.VisitorId}&width=48&height=48&format=png`;

	return (
		<Canvas size={useSpring(isHovered ? px(96, 48) : px(48, 48), FRIEND_SPRING_OPTIONS)}>
			{/* Shadow */}
			<imagelabel
				Image="rbxassetid://8992244272"
				ImageColor3={useSpring(isHovered ? theme.accent : theme.dropshadow, FRIEND_SPRING_OPTIONS)}
				ImageTransparency={useSpring(
					isHovered ? theme.glowTransparency : theme.dropshadowTransparency,
					FRIEND_SPRING_OPTIONS,
				)}
				Size={useSpring(isHovered ? px(88 + 36, 74) : px(76, 74), FRIEND_SPRING_OPTIONS)}
				Position={px(-14, -10)}
				ScaleType="Slice"
				SliceCenter={new Rect(new Vector2(42, 42), new Vector2(42, 42))}
				BackgroundTransparency={1}
			/>

			{/* Body */}
			<Fill
				radius={24}
				color={useSpring(isHovered ? theme.accent : theme.background, FRIEND_SPRING_OPTIONS)}
				transparency={theme.backgroundTransparency}
			/>
			{theme.outlined && (
				<Border
					Key="border"
					radius={23}
					color={isHovered && theme.foregroundAccent ? theme.foregroundAccent : theme.foreground}
					transparency={0.7}
				/>
			)}

			{/* Avatar */}
			<imagelabel
				Image={avatar}
				ScaleType="Crop"
				Size={px(48, 48)}
				LayoutOrder={index}
				BackgroundTransparency={1}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
			</imagelabel>

			{/* Play icon */}
			<Canvas clipsDescendants>
				<imagelabel
					Image="rbxassetid://8992244380"
					ImageColor3={isHovered && theme.foregroundAccent ? theme.foregroundAccent : theme.foreground}
					ImageTransparency={theme.foregroundTransparency}
					Size={px(36, 36)}
					Position={px(48, 6)}
					BackgroundTransparency={1}
				/>
			</Canvas>

			{/* Input capture */}
			<textbutton
				Text=""
				AutoButtonColor={false}
				Size={scale(1, 1)}
				BackgroundTransparency={1}
				Event={{
					Activated: () => {
						pcall(() => {
							TeleportService.TeleportToPlaceInstance(friend.PlaceId, friend.GameId, Players.LocalPlayer);
						});
					},
					MouseEnter: () => setHovered(true),
					MouseLeave: () => setHovered(false),
				}}
			/>
		</Canvas>
	);
}

export default hooked(FriendItem);
