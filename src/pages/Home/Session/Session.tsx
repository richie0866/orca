import Roact from "@rbxts/roact";
import { Players, Workspace } from "@rbxts/services";
import { pure } from "@rbxts/roact-hooked";

import Card, { CardHeader } from "components/Card";
import SessionLabel from "./SessionLabel";

import { CARD_HEIGHT_25, CARD_HEIGHT_50, CARD_MARGIN, CARD_WIDTH, IS_DEV } from "constants";
import { Page } from "store/pages";
import { useClient } from "hooks/use-client";

function Session() {
	const client = useClient();

	return (
		<Card
			getStyle={(theme) => theme.session}
			index={2}
			page={Page.Home}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_25)}
			position={new UDim2(0, CARD_WIDTH + CARD_MARGIN, 1, -CARD_HEIGHT_50 - CARD_MARGIN)}
		>
			<CardHeader text="Session" getColor={(theme) => theme.server.foreground} />

			<SessionLabel
				icon="rbxassetid://9550703910"
				description="Played for"
				getText={() => {
					const uptime = IS_DEV ? elapsedTime() : time();
					const days = math.floor(uptime / 86400);
					const hours = math.floor((uptime - days * 86400) / 3600);
					const minutes = math.floor((uptime - days * 86400 - hours * 3600) / 60);
					const seconds = math.floor(uptime - days * 86400 - hours * 3600 - minutes * 60);
					return days > 0
						? `${days} days`
						: hours > 0
						? `${hours} hours`
						: minutes > 0
						? `${minutes} minutes`
						: `${seconds} seconds`;
				}}
				order={0}
				position={62}
			/>

			<SessionLabel
				icon="rbxassetid://9550704015"
				description="Network ping"
				getText={() => `${math.round(client.GetNetworkPing() * 1000)} ms`}
				order={1}
				position={102}
			/>

			<SessionLabel
				icon="rbxassetid://9550704131"
				description="People nearby"
				getText={() => {
					const camera = Workspace.CurrentCamera;
					if (!camera) {
						return "0 players";
					}
					const nearby = Players.GetPlayers().filter((player) => {
						const distance = player.DistanceFromCharacter(camera.CFrame.Position);
						return player !== client && distance !== 0 && distance < 50;
					});
					return `${nearby.size()} players`;
				}}
				order={2}
				position={142}
			/>
		</Card>
	);
}

export default pure(Session);
