import Roact from "@rbxts/roact";
import { pure, useMemo } from "@rbxts/roact-hooked";
import Border from "components/Border";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { GameActivity } from "hooks/use-friends";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { arrayToMap } from "utils/array-util";
import { px } from "utils/udim2";
import FriendItem from "./FriendItem";

export const GAME_PADDING = 48;

interface Props {
	gameActivity: GameActivity;
	index: number;
}

function GameItem({ gameActivity, index }: Props) {
	const theme = useTheme("home").friendActivity;

	const isOpen = useIsPageOpen(DashboardPage.Home);
	const isVisible = useDelayedUpdate(isOpen, isOpen ? 330 + index * 100 : 300);
	const canvasLength = useMemo(() => {
		return gameActivity.friends.size() * (48 + 10) + 96;
	}, [gameActivity.friends.size()]);

	return (
		<imagelabel
			Image={gameActivity.thumbnail}
			ScaleType="Crop"
			Size={px(278, 156)}
			Position={useSpring(
				isVisible ? px(24, index * (GAME_PADDING + 156)) : px(-278, index * (GAME_PADDING + 156)),
				{},
			)}
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

				{arrayToMap(gameActivity.friends, (friend, index) => [
					tostring(friend.VisitorId),
					<FriendItem friend={friend} index={index} />,
				])}
			</scrollingframe>
		</imagelabel>
	);
}

export default pure(GameItem);
