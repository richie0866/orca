import Make from "@rbxts/make";
import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";
import { Players } from "@rbxts/services";
import { IS_DEV } from "constants";
import { setStore } from "jobs";
import { toggleDashboard } from "store/actions/dashboard.action";
import { configureStore } from "store/store";
import App from "./App";

if ("_ORCA_IS_LOADED" in getgenv()) {
	// Workers hang indefinitely
	throw "Orca is already loaded!";
}

const store = configureStore();
setStore(store);

const container = Make("Folder", {});
Roact.mount(
	<Provider store={store}>
		<App />
	</Provider>,
	container,
);

// Get the UI after mounting the app
const app = container.WaitForChild("1") as ScreenGui;
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

getgenv()._ORCA_IS_LOADED = true;

// Open UI if executed at least 3 seconds since the game started
if (time() > 3) {
	task.defer(() => store.dispatch(toggleDashboard()));
}
