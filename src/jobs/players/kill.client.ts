import { Players, Workspace } from "@rbxts/services";
import { getSelectedPlayer } from "jobs/helpers/get-selected-player";
import { getStore, onJobChange } from "jobs/helpers/job-store";
import { setJobActive } from "store/actions/jobs.action";

const player = Players.LocalPlayer;

// https://github.com/EdgeIY/infiniteyield/blob/master/source#L11261
async function attachToVictim(victim: Player): Promise<BasePart> {
	const backpack = player.FindFirstChildWhichIsA("Backpack");
	if (!backpack) {
		throw "No inventory found";
	}

	const playerCharacter = player.Character;
	const victimCharacter = victim.Character;
	if (!playerCharacter || !victimCharacter) {
		throw "Victim or local player has no character";
	}

	const playerHumanoid = playerCharacter.FindFirstChildWhichIsA("Humanoid");
	const playerRootPart = playerCharacter.FindFirstChild("HumanoidRootPart") as BasePart | undefined;
	const victimRootPart = victimCharacter.FindFirstChild("HumanoidRootPart") as BasePart | undefined;
	if (!playerHumanoid || !playerRootPart || !victimRootPart) {
		throw "Victim or local player has no Humanoid or root part";
	}

	// Only search for tools that contain a Handle; Prefer currently equipped
	// tools over the backpack
	const tool = [...playerCharacter.GetChildren(), ...backpack.GetChildren()].find(
		(obj): obj is Tool => obj.IsA("Tool") && obj.FindFirstChild("Handle") !== undefined,
	);
	if (!tool) {
		throw "A tool with a handle is required to kill this victim";
	}

	// Replace the local player's humanoid with one created locally
	// TODO: Check if this exact naming order is necessary
	playerHumanoid.Name = "";

	const mockHumanoid = playerHumanoid.Clone();
	mockHumanoid.DisplayName = utf8.char(128298); // Knife emoji
	mockHumanoid.Parent = playerCharacter;
	mockHumanoid.Name = "Humanoid";

	task.wait();
	playerHumanoid.Destroy();
	Workspace.CurrentCamera!.CameraSubject = mockHumanoid;

	// Equipping a tool here should allow two players to equip it at the same time
	tool.Parent = playerCharacter;

	// Teleport to victim to cause the equip bug
	for (let count = 0; count < 250; count++) {
		if (victimRootPart.Parent !== victimCharacter || playerRootPart.Parent !== playerCharacter) {
			throw "Victim or local player has no root part; did a player respawn?";
		}
		if (tool.Parent !== playerCharacter) {
			// Assume that some player equipped the tool. It might be the wrong
			// person, but this script is free of charge.
			return playerRootPart;
		}
		playerRootPart.CFrame = victimRootPart.CFrame;
		task.wait(0.1);
	}

	throw "Failed to attach to victim";
}

// https://github.com/EdgeIY/infiniteyield/blob/master/source#L11297
async function bringVictimToVoid(victim: Player) {
	const store = await getStore();

	const oldRootPart = player.Character?.FindFirstChild("HumanoidRootPart");
	const location = oldRootPart?.IsA("BasePart") ? oldRootPart.CFrame : undefined;

	// Refresh the character to increase chance of success
	store.dispatch(setJobActive("refresh", true));

	// Wait for the character to respawn
	await Promise.fromEvent(
		player.CharacterAdded,
		(character) => character.WaitForChild("HumanoidRootPart", 5) !== undefined,
	);
	task.wait(0.3);

	// Abuse a bug to have two players equip one tool at the same time
	const rootPart = await attachToVictim(victim);

	// Teleport to the void, stop when either player has no root part
	const [victimCharacter, playerCharacter] = [victim.Character!, player.Character!];
	do {
		task.wait(0.1);
		rootPart.CFrame = new CFrame(1000000, Workspace.FallenPartsDestroyHeight + 5, 1000000);
	} while (
		victimCharacter?.FindFirstChild("HumanoidRootPart") !== undefined &&
		playerCharacter?.FindFirstChild("HumanoidRootPart") !== undefined
	);

	// Wait for the local character to respawn, and return to original location
	const newCharacter = await Promise.fromEvent<Model & { HumanoidRootPart: BasePart }>(
		player.CharacterAdded,
		(character) => character.WaitForChild("HumanoidRootPart", 5) !== undefined,
	);

	if (location) {
		newCharacter.HumanoidRootPart.CFrame = location;
	}
}

async function main() {
	const store = await getStore();
	const playerSelected = await getSelectedPlayer();

	await onJobChange("kill", (job) => {
		if (job.active) {
			if (!playerSelected.current) {
				store.dispatch(setJobActive("kill", false));
				return;
			}

			bringVictimToVoid(playerSelected.current)
				.catch((err) => warn(`[kill-worker] ${err}`))
				.finally(() => store.dispatch(setJobActive("kill", false)));
		}
	});
}

main().catch((err) => {
	warn(`[kill-worker] ${err}`);
});
