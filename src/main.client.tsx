import Make from "@rbxts/make";
import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";
import { Players } from "@rbxts/services";
import { IS_DEV } from "constants";
import { setStore } from "jobs";
import { toggleDashboard } from "store/actions/dashboard.action";
import { configureStore } from "store/store";
import App from "./App";

const store = configureStore();
setStore(store);

/**
 * Mounts the app and retrieve the UI instance.
 */
async function mount() {
	const container = Make("Folder", {});
	Roact.mount(
		<Provider store={store}>
			<App />
		</Provider>,
		container,
	);
	return container.WaitForChild(1) as ScreenGui;
}

/**
 * Renders the app to the screen. Protects it if possible.
 * TODO: Roact portals are a better way to do this?
 */
function render(app: ScreenGui) {
	const protect = syn ? syn.protect_gui : protect_gui;
	if (protect) {
		protect(app);
	}

	if (IS_DEV) {
		app.Parent = Players.LocalPlayer.WaitForChild("PlayerGui");
	} else if (gethui) {
		app.Parent = gethui();
	} else {
		app.Parent = game.GetService("CoreGui");
	}
}

async function main() {
	if (getgenv && "_ORCA_IS_LOADED" in getgenv()) {
		throw "Orca is already loaded!";
	}

	const app = await mount();
	render(app);

	// If 3 seconds passed since the game started, show the dashboard
	if (time() > 3) {
		task.defer(() => store.dispatch(toggleDashboard()));
	}

	if (getgenv) {
		getgenv()._ORCA_IS_LOADED = true;
	}
}

main().catch((err) => {
	warn(`Orca failed to load: ${err}`);
});
