import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Provider } from "@rbxts/roact-rodux-hooked";

import App from "./App";
import { IS_DEV } from "constants";
import { configureStore } from "store";
import { setPagesVisible } from "store/pages";

const globals = getgenv ? getgenv() : {};

async function main() {
	if ("_ORCA_IS_LOADED" in globals) {
		throw "Orca is already loaded!";
	}

	const store = configureStore();

	Roact.mount(
		<Provider store={store}>
			<App />
		</Provider>,
		getTarget(),
	);

	// If 3 seconds passed since the game started, show the dashboard
	if (time() > 3) {
		store.dispatch(setPagesVisible(true));
	}

	globals._ORCA_IS_LOADED = true;
}

function getTarget() {
	if (gethui) {
		return gethui();
	}

	if (IS_DEV) {
		return Players.LocalPlayer.WaitForChild("PlayerGui");
	}

	return game.GetService("CoreGui");
}

main().catch((err) => {
	warn(`Orca failed to load: ${err}`);
});
