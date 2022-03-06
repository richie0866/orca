import { Players } from "@rbxts/services";
import { getStore } from "jobs/helpers/job-store";

export async function getSelectedPlayer(onChange?: (player: Player | undefined) => void) {
	const store = await getStore();
	const playerSelected = { current: undefined as Player | undefined };

	store.changed.connect((newState) => {
		const name = newState.dashboard.apps.playerSelected;

		if (playerSelected.current?.Name !== name) {
			playerSelected.current = name !== undefined ? (Players.FindFirstChild(name) as Player) : undefined;

			if (onChange) {
				task.defer(onChange, playerSelected.current);
			}
		}
	});

	return playerSelected;
}
