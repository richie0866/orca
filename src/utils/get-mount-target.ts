import { Players } from "@rbxts/services";

function canMountToCoreGui() {
	return opcall(() => game.GetService("CoreGui").Name).success;
}

export function getMountTarget() {
	if (gethui) {
		return gethui();
	}
	if (canMountToCoreGui()) {
		return game.GetService("CoreGui");
	}
	return Players.LocalPlayer.WaitForChild("PlayerGui");
}
