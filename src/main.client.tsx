import Make from "@rbxts/make";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Provider } from "@rbxts/roact-rodux-hooked";

import App from "./App";
import { IS_DEV } from "constants";
import { RootStore, configureStore } from "store";
import { setPagesVisible } from "store/pages";

async function main() {
	const globals = getgenv ? getgenv() : (_G as Record<string, unknown>);

	if ("_ORCA_IS_LOADED" in globals) {
		throw "Orca is already loaded!";
	}

	const store = configureStore();
	await mount(store);

	// If 3 seconds passed since the game started, show the dashboard
	if (time() > 3) {
		store.dispatch(setPagesVisible(true));
	}

	globals._ORCA_IS_LOADED = true;
}

async function mount(store: RootStore) {
	const container = Make("Folder", {});

	Roact.mount(
		<Provider store={store}>
			<App />
		</Provider>,
		container,
	);

	const renderChild = (child: Instance) => {
		if (!child.IsA("ScreenGui")) {
			//return;
		}

		(syn ? syn.protect_gui : protect_gui)?.(child as ScreenGui);

		if (gethui) {
			child.Parent = gethui();
		} else {
			child.Parent = IS_DEV ? Players.LocalPlayer.WaitForChild("PlayerGui") : game.GetService("CoreGui");
		}
	};

	container.ChildAdded.Connect(renderChild);
	container.GetChildren().forEach(renderChild);
}

main().catch((err) => {
	warn(`Orca failed to load: ${err}`);
});
