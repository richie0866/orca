import { Players, Workspace } from "@rbxts/services";
import { getStore, onJobChange } from "jobs/helpers/job-store";
import { JobsAction } from "store/actions/jobs.action";

const player = Players.LocalPlayer;

let currentCharacter: Model | undefined;

async function main() {
	function errorHandler(err: unknown) {
		warn(`[godmode-worker] ${err}`);
		deactivate();
	}

	await onJobChange("godmode", (job, state) => {
		if (state.jobs.ghost.active && job.active) {
			// Can't enable godmode while ghost
			deactivate();
		} else if (job.active) {
			// Activate godmode
			activateGodmode().then(deactivateOnCharacterAdded).catch(errorHandler);
		}
	});
}

async function deactivate() {
	const store = await getStore();
	store.dispatch({
		type: "jobs/setJobActive",
		jobName: "godmode",
		active: false,
	} as JobsAction);
}

async function deactivateOnCharacterAdded() {
	const store = await getStore();
	await Promise.fromEvent(player.CharacterAdded, (character) => {
		const jobs = store.getState().jobs;
		return !jobs.ghost.active && character !== currentCharacter;
	});
	await deactivate();
}

// https://github.com/EdgeIY/infiniteyield/blob/master/source#L9043
async function activateGodmode() {
	const cameraCFrame = Workspace.CurrentCamera!.CFrame;

	const character = player.Character;
	if (!character) {
		throw "Character is null";
	}

	const humanoid = character.FindFirstChildWhichIsA("Humanoid");
	if (!humanoid) {
		throw "No humanoid found";
	}

	const mockHumanoid = humanoid.Clone();
	mockHumanoid.Parent = character;
	currentCharacter = character;

	player.Character = undefined;

	// TODO: Check if these are optional
	mockHumanoid.SetStateEnabled(Enum.HumanoidStateType.Dead, false);
	mockHumanoid.SetStateEnabled(Enum.HumanoidStateType.Ragdoll, false);
	mockHumanoid.SetStateEnabled(Enum.HumanoidStateType.FallingDown, false);
	mockHumanoid.BreakJointsOnDeath = true;
	mockHumanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None;
	humanoid.Destroy();

	player.Character = character;
	Workspace.CurrentCamera!.CameraSubject = mockHumanoid;
	task.defer(() => {
		// TODO: Check if this is optional
		Workspace.CurrentCamera!.CFrame = cameraCFrame;
	});

	const animation = character.FindFirstChild("Animate") as LocalScript | undefined;
	if (animation) {
		// Re-run the animation script for the new Humanoid
		animation.Disabled = true;
		animation.Disabled = false;
	}

	// Mark the character as godmode
	mockHumanoid.MaxHealth = math.huge;
	mockHumanoid.Health = mockHumanoid.MaxHealth;
}

main().catch((err) => {
	warn(`[godmode-worker] ${err}`);
});
