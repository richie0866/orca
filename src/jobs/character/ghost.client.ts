import { Players, Workspace } from "@rbxts/services";
import { getStore, onJobChange } from "jobs/helpers/job-store";
import { JobsAction } from "store/actions/jobs.action";

const player = Players.LocalPlayer;

let originalCharacter: Model | undefined;
let ghostCharacter: Model | undefined;
let lastPosition: CFrame | undefined;

async function main() {
	await onJobChange("ghost", (job, state) => {
		if (state.jobs.refresh.active && job.active) {
			// Can't enable ghost while respawning
			deactivate();
		} else if (job.active) {
			// Enable ghost mode
			activateGhost()
				.then(deactivateOnCharacterAdded)
				.catch((err) => {
					warn(`[ghost-worker-active] ${err}`);
					deactivate();
				});
		} else if (!state.jobs.refresh.active) {
			// Deactivate ghost if inactive & not respawning
			deactivateGhost().catch((err) => {
				warn(`[ghost-worker-inactive] ${err}`);
			});
		}
	});
}

async function deactivate() {
	const store = await getStore();
	store.dispatch({
		type: "jobs/setJobActive",
		jobName: "ghost",
		active: false,
	} as JobsAction);
}

async function deactivateOnCharacterAdded() {
	await Promise.fromEvent(
		player.CharacterAdded,
		(character) => character !== originalCharacter && character !== ghostCharacter,
	);
	await deactivate();
}

async function activateGhost() {
	const character = player.Character;
	const humanoid = character?.FindFirstChildWhichIsA("Humanoid");
	if (!character || !humanoid) {
		throw "Character or Humanoid is null";
	}

	// Create fake character
	character.Archivable = true;
	ghostCharacter = character.Clone();
	character.Archivable = false;

	// Save position to restore later
	const rootPart = character.FindFirstChild("HumanoidRootPart");
	lastPosition = rootPart?.IsA("BasePart") ? rootPart.CFrame : undefined;
	originalCharacter = character;

	// Add ghost effect
	const ghostHumanoid = ghostCharacter.FindFirstChildWhichIsA("Humanoid");
	for (const child of ghostCharacter.GetDescendants()) {
		if (child.IsA("BasePart")) {
			child.Transparency = 1 - (1 - child.Transparency) * 0.5;
		}
	}
	if (ghostHumanoid) {
		ghostHumanoid.DisplayName = utf8.char(128123); // Ghost emoji
	}

	// Set up animation
	ghostCharacter.FindFirstChild("Animate")?.Destroy();
	const animation = originalCharacter.FindFirstChild("Animate") as LocalScript | undefined;
	if (animation) {
		animation.Disabled = true;
		animation.Parent = ghostCharacter;
	}

	// Set up fake character
	ghostCharacter.Parent = character.Parent;
	player.Character = ghostCharacter;
	Workspace.CurrentCamera!.CameraSubject = ghostHumanoid;

	// Start animation
	if (animation) {
		animation.Disabled = false;
	}

	// Respawn on death
	const handle = humanoid.Died.Connect(() => {
		handle.Disconnect();
		deactivate();
	});
}

async function deactivateGhost() {
	if (!originalCharacter || !ghostCharacter) {
		return; // Not currently ghost
	}

	// Store current position in ghost mode if possible
	const rootPart = originalCharacter.FindFirstChild("HumanoidRootPart");
	const ghostRootPart = ghostCharacter.FindFirstChild("HumanoidRootPart");
	const currentPosition = ghostRootPart?.IsA("BasePart") ? ghostRootPart.CFrame : undefined;

	// Save animation script
	const animation = ghostCharacter.FindFirstChild("Animate") as LocalScript | undefined;
	if (animation) {
		animation.Disabled = true;
		animation.Parent = undefined;
	}

	// Remove fake character
	ghostCharacter.Destroy();

	// Clear animations on original character
	const humanoid = originalCharacter.FindFirstChildWhichIsA("Humanoid");
	humanoid?.GetPlayingAnimationTracks().forEach((track) => track.Stop());

	// Restore original character
	const position = currentPosition || lastPosition;
	if (rootPart?.IsA("BasePart") && position) {
		rootPart.CFrame = position;
	}
	player.Character = originalCharacter;
	Workspace.CurrentCamera!.CameraSubject = humanoid;

	// Restore animation
	if (animation) {
		animation.Parent = originalCharacter;
		animation.Disabled = false;
	}

	originalCharacter = undefined;
	ghostCharacter = undefined;
	lastPosition = undefined;
}

main().catch((err) => {
	warn(`[ghost-worker] ${err}`);
});
