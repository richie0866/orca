import Roact from "@rbxts/roact";
import { hooked, pure, useMemo, useReducer, useState } from "@rbxts/roact-hooked";
import { Players, TeleportService } from "@rbxts/services";

import Border from "components/Border";
import Canvas from "components/Canvas";
import Card from "components/Card";
import Fill from "components/Fill";

import { useInterval } from "hooks/common/use-interval";
import { useSpring } from "hooks/common/use-spring";
import { GameActivity, useFriendActivity } from "hooks/use-friends";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { arrayToMap } from "utils/array-util";
import { px, scale } from "utils/udim2";

const FRIEND_SPRING_OPTIONS = { frequency: 6 };
const GAME_PADDING = 48;

function FriendActivityCard() {
	const theme = useTheme("home").friendActivity;
	const [update, forceUpdate] = useReducer((state: number) => state + 1, 0);
	const [games, , status] = useFriendActivity([update]);

	// Force a re-render every 10 seconds. If the games list is empty, retry the
	// request if it's not pending.
	useInterval(() => forceUpdate(), games.size() === 0 && status !== "pending" ? 3000 : 30000);

	return (
		<Card index={3} page={DashboardPage.Home} theme={theme} size={px(326, 416)} position={new UDim2(0, 374, 1, 0)}>
			<textlabel
				Text="Friend Activity"
				Font="GothamBlack"
				TextSize={20}
				TextColor3={theme.foreground}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={px(24, 24)}
				BackgroundTransparency={1}
			/>

			<Canvas
				anchor={new Vector2(0, 1)}
				size={useSpring(games.size() > 0 ? new UDim2(1, 0, 0, 344) : new UDim2(1, 0, 0, 0), {})}
				position={scale(0, 1)}
			>
				<scrollingframe
					Size={scale(1, 1)}
					ScrollBarThickness={0}
					ScrollBarImageTransparency={1}
					ScrollingDirection="Y"
					CanvasSize={px(0, games.size() * (GAME_PADDING + 156) + GAME_PADDING)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
				>
					{arrayToMap(games, (gameActivity, index) => [
						tostring(gameActivity.placeId),
						<GameEntry game={gameActivity} index={index} />,
					])}
				</scrollingframe>
			</Canvas>
		</Card>
	);
}

export default hooked(FriendActivityCard);

function GameEntryComponent(props: { game: GameActivity; index: number }) {
	const theme = useTheme("home").friendActivity;

	const canvasLength = useMemo(() => {
		return props.game.friends.size() * (48 + 10) + 96;
	}, [props.game.friends.size()]);

	return (
		<imagelabel
			Image={props.game.thumbnail}
			ScaleType="Crop"
			Size={px(278, 156)}
			Position={px(24, props.index * (GAME_PADDING + 156))}
			LayoutOrder={-props.game.friends.size()}
			BackgroundTransparency={1}
		>
			<Border color={theme.foreground} radius={8} transparency={0.8} />
			<uicorner CornerRadius={new UDim(0, 8)} />

			{/* Friends */}
			<scrollingframe
				Size={new UDim2(1, 0, 0, 64)}
				Position={new UDim2(0, 0, 1, -24)}
				CanvasSize={px(canvasLength, 0)}
				ScrollingDirection="X"
				ScrollBarThickness={0}
				ScrollBarImageTransparency={1}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ClipsDescendants={false}
			>
				<uilistlayout
					SortOrder="LayoutOrder"
					FillDirection="Horizontal"
					HorizontalAlignment="Left"
					VerticalAlignment="Top"
					Padding={new UDim(0, 10)}
				/>
				<uipadding PaddingLeft={new UDim(0, 10)} />

				{
					new Map(
						props.game.friends.map((friend, index) => [
							tostring(friend.VisitorId),
							<FriendEntry friend={friend} index={index} />,
						]),
					)
				}
			</scrollingframe>
		</imagelabel>
	);
}

const GameEntry = pure(GameEntryComponent);

function FriendEntryComponent(props: { friend: FriendOnlineInfoGame; index: number }) {
	const theme = useTheme("home").friendActivity.friendButton;
	const [isHovered, setHovered] = useState(false);

	const avatar = `https://www.roblox.com/headshot-thumbnail/image?userId=${props.friend.VisitorId}&width=48&height=48&format=png`;

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
				LayoutOrder={props.index}
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
							TeleportService.TeleportToPlaceInstance(
								props.friend.PlaceId,
								props.friend.GameId,
								Players.LocalPlayer,
							);
						});
					},
					MouseEnter: () => setHovered(true),
					MouseLeave: () => setHovered(false),
				}}
			/>
		</Canvas>
	);
}

const FriendEntry = hooked(FriendEntryComponent);
