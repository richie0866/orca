import Roact from "@rbxts/roact";
import { Players, Workspace } from "@rbxts/services";
import { pure } from "@rbxts/roact-hooked";

import SessionLabel from "./SessionLabel";
import { IS_RUNNING } from "constants/env";
import { useClient } from "hooks/use-client";

function SessionInfo() {
	const client = useClient();

	return (
		<>
			<SessionLabel
				icon="rbxassetid://9550703910"
				description="Played for"
				getText={() => {
					const uptime = IS_RUNNING ? time() : elapsedTime();
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
					const nearby = Players.GetPlayers().reduce((acc, player) => {
						const distance = player.DistanceFromCharacter(camera.CFrame.Position);
						if (player !== client && distance > 0 && distance < 50) {
							return acc + 1;
						}
						return acc;
					}, 0);
					return `${nearby} players`;
				}}
				order={2}
				position={142}
			/>
		</>
	);
}

export default pure(SessionInfo);
