import Roact from "@rbxts/roact";
import { pure, useEffect, useReducer, useState } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

import GameCard, { HEIGHT, PADDING } from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { GamesPage } from "store/games";
import { useFriendGameActivity } from "hooks/use-friends";
import { useRootSelector } from "hooks/use-root-store";

const SKELETON = [<GameCardSkeleton order={0} />, <GameCardSkeleton order={1} />, <GameCardSkeleton order={2} />];

function GameList() {
	const visible = useRootSelector((state) => state.games.page === GamesPage.GameList);
	const visibility = useSpring(visible ? 1 : 0, {});

	const [shouldUpdate, dispatchUpdate] = useReducer((state: number) => state + 1, 0);

	const [result, , status] = useFriendGameActivity([shouldUpdate]);
	const [games, setGames] = useState(result);

	// Sort and cache the result
	useEffect(() => {
		if (result.size() > 0) {
			return;
		}
		setGames(result.sort((a, b) => a.friends.size() > b.friends.size()));
	}, [result]);

	// Send new requests automatically
	useEffect(() => {
		switch (status) {
			case "pending": {
				return;
			}
			case "rejected": {
				const thread = task.delay(5, () => task.defer(dispatchUpdate));
				return () => task.cancel(thread);
			}
			case "resolved": {
				const thread = task.delay(30, () => task.defer(dispatchUpdate));
				return () => task.cancel(thread);
			}
		}
	}, [status]);

	return (
		<scrollingframe
			CanvasSize={
				games.size() > 0
					? new UDim2(0, 0, 0, games.size() * (PADDING + HEIGHT))
					: new UDim2(0, 0, 0, 3 * (PADDING + HEIGHT))
			}
			ScrollBarThickness={0}
			ScrollBarImageTransparency={1}
			ScrollingDirection="Y"
			Size={new UDim2(1, 0, 1, -64)}
			Position={visibility.map((n) => new UDim2(-1 + n, 0, 0, 64))}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			{games.size() > 0 ? games.map((info, order) => <GameCard info={info} order={order} />) : SKELETON}
		</scrollingframe>
	);
}

export default pure(GameList);
