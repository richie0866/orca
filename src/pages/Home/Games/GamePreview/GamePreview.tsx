import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

import { GamesPage } from "store/games";
import { useRootSelector } from "hooks/use-root-store";

function GamePreview() {
	const visible = useRootSelector((state) => state.games.page === GamesPage.GameList);
	const visibility = useSpring(visible ? 1 : 0, {});

	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			Position={visibility.map((n) => new UDim2(n, 0, 0, 64))}
			BackgroundTransparency={1}
		/>
	);
}

export default pure(GamePreview);
