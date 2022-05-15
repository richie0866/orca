import { Players } from "@rbxts/services";
import { selectJumpHeight, selectJumpHeightValue } from "reducers/profile";
import { selectStore, storeChanged } from "store";

const JUMP_POWER_CONSTANT = 349.24; // Used for conversion between jump height and jump power

const player = Players.LocalPlayer;

const isEnabled = () => selectStore(selectJumpHeight);
const getValue = () => selectStore(selectJumpHeightValue);

let defaultValue = 7.2;

player.CharacterAdded.Connect((character) => {
	const humanoid = character.WaitForChild("Humanoid", 3);

	if (humanoid && humanoid.IsA("Humanoid")) {
		setDefaultJumpHeight();

		if (isEnabled()) {
			updateJumpHeight(getValue());
		}
	}
});

// Update the default value or reset the jump height
storeChanged(selectJumpHeight, (enabled) => {
	if (enabled) {
		setDefaultJumpHeight();
		updateJumpHeight(getValue());
	} else {
		updateJumpHeight(defaultValue);
	}
});

// Update the humanoid only when the value changes
storeChanged(selectJumpHeightValue, (value) => {
	if (isEnabled()) {
		updateJumpHeight(value);
	}
});

function updateJumpHeight(value: number) {
	const humanoid = player.Character?.FindFirstChildWhichIsA("Humanoid");
	if (humanoid) {
		if (humanoid.UseJumpPower) {
			humanoid.JumpPower = math.sqrt(JUMP_POWER_CONSTANT * value);
		} else {
			humanoid.JumpHeight = value;
		}
	}
}

function setDefaultJumpHeight() {
	const humanoid = player.Character?.FindFirstChildWhichIsA("Humanoid");
	if (humanoid) {
		defaultValue = humanoid.JumpHeight;
	}
}
