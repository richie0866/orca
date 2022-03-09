import { HttpService, Players, TeleportService } from "@rbxts/services";
import { getStore, onJobChange } from "jobs/helpers/job-store";
import { setJobActive } from "store/actions/jobs.action";
import * as http from "utils/http";
import { setTimeout, Timeout } from "utils/timeout";

interface GameServer {
	id: string;
	maxPlayers: number;
	playing: number;
}

interface GameServersResponse {
	data: Array<GameServer>;
}

// https://github.com/EdgeIY/infiniteyield/blob/master/source#L6833
async function onServerHop() {
	queueExecution();

	const servers = HttpService.JSONDecode(
		await http.get(`https://games.roblox.com/v1/games/${game.PlaceId}/servers/Public?sortOrder=Asc&limit=100`),
	) as GameServersResponse;

	const serversAvailable = servers.data.filter(
		(server) => server.playing < server.maxPlayers && server.id !== game.JobId,
	);

	if (serversAvailable.size() === 0) {
		throw "[server-worker-switch] No servers available.";
	} else {
		const server = serversAvailable[math.random(serversAvailable.size() - 1)];
		TeleportService.TeleportToPlaceInstance(game.PlaceId, server.id);
	}
}

async function onRejoin() {
	queueExecution();

	if (Players.GetPlayers().size() === 1) {
		TeleportService.Teleport(game.PlaceId, Players.LocalPlayer);
	} else {
		TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId);
	}
}

function queueExecution() {
	const isRelease = VERSION.match("^.+%..+%..+$") !== undefined;
	const code = isRelease
		? 'loadstring(game:HttpGetAsync("https://raw.githubusercontent.com/richie0866/orca/master/public/latest.lua"))()'
		: 'loadstring(game:HttpGetAsync("https://raw.githubusercontent.com/richie0866/orca/master/public/snapshot.lua"))()';

	(syn?.queue_on_teleport ?? queue_on_teleport)?.(code);
}

async function main() {
	const store = await getStore();

	let timeout: Timeout | undefined;
	function clearTimeout() {
		timeout?.clear();
		timeout = undefined;
	}

	await onJobChange("rejoinServer", (job, state) => {
		clearTimeout();

		if (state.jobs.switchServer.active) {
			setJobActive("switchServer", false);
		}

		if (job.active) {
			timeout = setTimeout(() => {
				onRejoin().catch((err) => {
					warn(`[server-worker-rejoin] ${err}`);
					store.dispatch(setJobActive("rejoinServer", false));
				});
			}, 1000);
		}
	});

	await onJobChange("switchServer", (job, state) => {
		clearTimeout();

		if (state.jobs.rejoinServer.active) {
			setJobActive("rejoinServer", false);
		}

		if (job.active) {
			timeout = setTimeout(() => {
				onServerHop().catch((err) => {
					warn(`[server-worker-switch] ${err}`);
					store.dispatch(setJobActive("switchServer", false));
				});
			}, 1000);
		}
	});
}

main().catch((err) => {
	warn(`[server-worker] ${err}`);
});
