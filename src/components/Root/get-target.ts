import { Players } from "@rbxts/services";

function hasCoreAccess() {
	return opcall(() => game.GetService("CoreGui").Name).success;
}

export function getTarget() {
	if (gethui) {
		return gethui(); // Script engine
	}
	if (hasCoreAccess()) {
		return game.GetService("CoreGui"); // Plugin, Command line
	}
	return Players.LocalPlayer.WaitForChild("PlayerGui"); // LocalScript
}
