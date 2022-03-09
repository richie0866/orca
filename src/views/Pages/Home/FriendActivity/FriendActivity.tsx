import Roact from "@rbxts/roact";
import { hooked, useEffect, useReducer, useState } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import { useInterval } from "hooks/common/use-interval";
import { useSpring } from "hooks/common/use-spring";
import { useFriendActivity } from "hooks/use-friends";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { arrayToMap } from "utils/array-util";
import { px, scale } from "utils/udim2";
import GameItem, { GAME_PADDING } from "./GameItem";

function FriendActivity() {
	const theme = useTheme("home").friendActivity;
	const [update, forceUpdate] = useReducer((state: number) => state + 1, 0);
	const [currentGames, , status] = useFriendActivity([update]);

	// Update games state with currentGames if not empty, also do some sorting
	const [games, setGames] = useState(currentGames);
	useEffect(() => {
		if (currentGames.size() > 0) {
			setGames(currentGames.sort((a, b) => a.friends.size() > b.friends.size()));
		}
	}, [currentGames]);

	// Force a re-render every 10 seconds. If the games list is empty, retry the
	// request if it's not pending.
	useInterval(() => forceUpdate(), currentGames.size() === 0 && status !== "pending" ? 5000 : 30000);

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
						<GameItem gameActivity={gameActivity} index={index} />,
					])}
				</scrollingframe>
			</Canvas>
		</Card>
	);
}

export default hooked(FriendActivity);
