import Make from "@rbxts/make";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";

import App from "./App";
import { IS_DEV } from "constants";
import { configureStore } from "store";
import { togglePagesVisible } from "store/pages";

async function main() {
	const globals = getgenv?.() || (_G as Record<string, unknown>);

	if ("_ORCA_IS_LOADED" in globals) {
		throw "Orca is already loaded!";
	}

	const store = configureStore();
	await mount();

	// If 3 seconds passed since the game started, show the dashboard
	if (time() > 3) {
		store.dispatch(togglePagesVisible());
	}

	globals._ORCA_IS_LOADED = true;
}

async function mount() {
	const container = Make("Folder", {});

	Roact.mount(<App />, container);

	const renderChild = (child: Instance) => {
		if (!child.IsA("ScreenGui")) {
			return;
		}

		(syn ? syn.protect_gui : protect_gui)?.(child);

		if (gethui) {
			child.Parent = gethui();
		} else {
			child.Parent = IS_DEV ? game.GetService("CoreGui") : Players.LocalPlayer.WaitForChild("PlayerGui");
		}
	};

	container.ChildAdded.Connect(renderChild);
	container.GetChildren().forEach(renderChild);
}

main().catch((err) => {
	warn(`Orca failed to load: ${err}`);
});
