import { UserInputService } from "@rbxts/services";

const moveDirection: Record<string, number> = {
	W: 0,
	S: 0,
	A: 0,
	D: 0,
	Q: 0,
	E: 0,
};

const NEGATIVE_DIRECTIONS = new Set(["W", "A", "Q"]);

export function getDirection() {
	const average = new Vector3(
		(moveDirection.A + moveDirection.D) / 2,
		(moveDirection.Q + moveDirection.E) / 2,
		(moveDirection.W + moveDirection.S) / 2,
	);
	return average.Magnitude > 0 ? average.Unit : average;
}

export function updateDirection(code: Enum.KeyCode, began: boolean) {
	let name = code.Name;

	// hard-code button aliases
	if (name === "Space") {
		name = "E";
	} else if (name === "LeftShift") {
		name = "Q";
	}

	if (began) {
		moveDirection[name] = NEGATIVE_DIRECTIONS.has(name) ? -1 : 1;
	} else {
		moveDirection[name] = 0;
	}
}

UserInputService.InputBegan.Connect((input, gameProcessed) => {
	if (!gameProcessed) {
		updateDirection(input.KeyCode, true);
	}
});

UserInputService.InputEnded.Connect((input, gameProcessed) => {
	if (!gameProcessed) {
		updateDirection(input.KeyCode, false);
	}
});
