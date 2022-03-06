import { Players, Workspace } from "@rbxts/services";
import { getStore, onJobChange } from "jobs/helpers/job-store";
import { JobsAction } from "store/actions/jobs.action";

const MAX_RESPAWN_TIME = 10;

const player = Players.LocalPlayer;

async function main() {
	const store = await getStore();

	function deactivate() {
		store.dispatch({
			type: "jobs/setJobActive",
			jobName: "refresh",
			active: false,
		} as JobsAction);
	}

	await onJobChange("refresh", (job, state) => {
		if (state.jobs.ghost.active && job.active) {
			deactivate();
		} else if (job.active) {
			respawn()
				.catch((err) => warn(`[refresh-worker-respawn] ${err}`))
				.finally(() => deactivate());
		}
	});
}

// https://github.com/EdgeIY/infiniteyield/blob/master/source#L4871
async function respawn() {
	const character = player.Character;
	if (!character) {
		throw "Character is null";
	}

	// Save current location
	const respawnLocation = (character.FindFirstChild("HumanoidRootPart") as BasePart | undefined)?.CFrame;

	const humanoid = character.FindFirstAncestorWhichIsA("Humanoid");
	humanoid?.ChangeState(Enum.HumanoidStateType.Dead);
	character.ClearAllChildren();

	const mockCharacter = new Instance("Model", Workspace);
	player.Character = mockCharacter;
	player.Character = character;

	mockCharacter.Destroy();

	if (!respawnLocation) {
		return; // Skip waiting for character to respawn
	}

	const newCharacter = await Promise.fromEvent(player.CharacterAdded).timeout(
		MAX_RESPAWN_TIME,
		"CharacterAdded event timed out",
	);

	const humanoidRoot = newCharacter.WaitForChild("HumanoidRootPart", 5);

	if (humanoidRoot && humanoidRoot.IsA("BasePart") && respawnLocation) {
		task.delay(0.1, () => {
			humanoidRoot.CFrame = respawnLocation;
		});
	}
}

main().catch((err) => {
	warn(`[refresh-worker] ${err}`);
});
