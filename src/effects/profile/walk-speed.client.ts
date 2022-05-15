import { Players } from "@rbxts/services";
import { selectStore, storeChanged } from "store";
import { selectWalkSpeed, selectWalkSpeedValue } from "reducers/profile";

const player = Players.LocalPlayer;

const isEnabled = () => selectStore(selectWalkSpeed);
const getValue = () => selectStore(selectWalkSpeedValue);

let defaultValue = 16;

player.CharacterAdded.Connect((character) => {
	const humanoid = character.WaitForChild("Humanoid", 3);

	if (humanoid && humanoid.IsA("Humanoid")) {
		setDefaultWalkSpeed();

		if (isEnabled()) {
			updateWalkSpeed(getValue());
		}
	}
});

// Update the default value or reset the walk speed
storeChanged(selectWalkSpeed, (enabled) => {
	if (enabled) {
		setDefaultWalkSpeed();
		updateWalkSpeed(getValue());
	} else {
		updateWalkSpeed(defaultValue);
	}
});

// Update the humanoid only when the value changes
storeChanged(selectWalkSpeedValue, (value) => {
	if (isEnabled()) {
		updateWalkSpeed(value);
	}
});

function updateWalkSpeed(value: number) {
	const humanoid = player.Character?.FindFirstChildWhichIsA("Humanoid");
	if (humanoid) {
		humanoid.WalkSpeed = value;
	}
}

function setDefaultWalkSpeed() {
	const humanoid = player.Character?.FindFirstChildWhichIsA("Humanoid");
	if (humanoid) {
		defaultValue = humanoid.WalkSpeed;
	}
}
