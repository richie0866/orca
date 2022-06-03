import { Players } from "@rbxts/services";
import { getStore, onJobChange } from "jobs/helpers/job-store";
import { JobWithValue } from "store/models/jobs.model";

const JUMP_POWER_CONSTANT = 349.24;

const player = Players.LocalPlayer;
const defaults = {
	walkSpeed: 16,
	jumpHeight: 7.2,
};

async function main() {
	const store = await getStore();

	let humanoid = player.Character?.FindFirstChildWhichIsA("Humanoid");

	// References to the Humanoid state in the Rodux store.
	const state = store.getState();
	let walkSpeedJob = state.jobs.walkSpeed;
	let jumpHeightJob = state.jobs.jumpHeight;

	await onJobChange("walkSpeed", (job) => {
		if (job.active && !walkSpeedJob.active) {
			setDefaultWalkSpeed(humanoid);
		}
		walkSpeedJob = job;
		updateWalkSpeed(humanoid, walkSpeedJob);
	});

	await onJobChange("jumpHeight", (job) => {
		if (job.active && !jumpHeightJob.active) {
			setDefaultJumpHeight(humanoid);
		}
		jumpHeightJob = job;
		updateJumpHeight(humanoid, jumpHeightJob);
	});

	player.CharacterAdded.Connect((character) => {
		const newHumanoid = character.WaitForChild("Humanoid", 5);
		if (newHumanoid && newHumanoid.IsA("Humanoid")) {
			humanoid = newHumanoid;

			setDefaultWalkSpeed(newHumanoid);
			setDefaultJumpHeight(newHumanoid);

			if (walkSpeedJob.active) {
				updateWalkSpeed(newHumanoid, walkSpeedJob);
			}
			if (jumpHeightJob.active) {
				updateJumpHeight(newHumanoid, jumpHeightJob);
			}
		}
	});

	setDefaultWalkSpeed(humanoid);
	setDefaultJumpHeight(humanoid);
}

function setDefaultWalkSpeed(humanoid: Humanoid | undefined) {
	if (humanoid) {
		defaults.walkSpeed = humanoid.WalkSpeed;
	}
}

function setDefaultJumpHeight(humanoid: Humanoid | undefined) {
	if (humanoid) {
		defaults.jumpHeight = humanoid.JumpHeight;
	}
}

function updateWalkSpeed(humanoid: Humanoid | undefined, walkSpeedJob: JobWithValue<number>) {
	if (!humanoid) {
		return;
	}
	if (walkSpeedJob.active) {
		humanoid.WalkSpeed = walkSpeedJob.value;
	} else {
		humanoid.WalkSpeed = defaults.walkSpeed;
	}
}

function updateJumpHeight(humanoid: Humanoid | undefined, jumpHeightJob: JobWithValue<number>) {
	if (!humanoid) {
		return;
	}
	if (jumpHeightJob.active) {
		humanoid.JumpHeight = jumpHeightJob.value;
		if (humanoid.UseJumpPower) {
			humanoid.JumpPower = math.sqrt(JUMP_POWER_CONSTANT * jumpHeightJob.value);
		}
	} else {
		humanoid.JumpHeight = defaults.jumpHeight;
		if (humanoid.UseJumpPower) {
			humanoid.JumpPower = math.sqrt(JUMP_POWER_CONSTANT * defaults.jumpHeight);
		}
	}
}

main().catch((err) => {
	warn(`[humanoid-worker] ${err}`);
});
