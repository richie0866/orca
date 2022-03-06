import { Players } from "@rbxts/services";
import { getSelectedPlayer } from "jobs/helpers/get-selected-player";
import { getStore, onJobChange } from "jobs/helpers/job-store";
import { setJobActive } from "store/actions/jobs.action";

// Store the currently hidden character to restore them later. Don't replace
// characterParent with `nil` to avoid setting any parent to `nil`.
const current = new Map<
	Player,
	{ character: Model; parent: Instance | undefined; handle: RBXScriptConnection } | undefined
>();

function hide(player: Player) {
	if (current.has(player)) {
		return;
	}
	const character = player.Character!;
	const data = {
		character,
		parent: character.Parent,
		handle: player.CharacterAdded.Connect((newCharacter) => {
			newCharacter.Parent = undefined;
			data.character = character;
		}),
	};
	current.set(player, data);
	character.Parent = undefined;
}

function unhide(player: Player, setParent: boolean) {
	if (!current.has(player)) {
		return;
	}
	const data = current.get(player)!;

	if (setParent) {
		data.character.Parent = data.parent;
	}
	data.handle.Disconnect();

	current.delete(player);
}

async function main() {
	const store = await getStore();
	const playerSelected = await getSelectedPlayer((player) => {
		store.dispatch(setJobActive("hide", player ? current.has(player) : false));
	});

	Players.PlayerRemoving.Connect((player) => {
		if (player === playerSelected.current) {
			store.dispatch(setJobActive("hide", false));
		} else {
			unhide(player, false);
		}
	});

	await onJobChange("hide", (job) => {
		const player = playerSelected.current;
		if (!player) {
			store.dispatch(setJobActive("hide", false));
			return;
		}

		if (job.active && player.Character) {
			hide(player);
		} else if (!job.active) {
			unhide(player, true);
		}
	});
}

main().catch((err) => {
	warn(`[hide-worker] ${err}`);
});
