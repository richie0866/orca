import { Players } from "@rbxts/services";

function hasCoreAccess() {
	return opcall(() => game.GetService("CoreGui").Name).success;
}

export function getTarget() {
	if (gethui) {
		return gethui();
	}
	if (hasCoreAccess()) {
		return game.GetService("CoreGui");
	}
	return Players.LocalPlayer.WaitForChild("PlayerGui");
}
