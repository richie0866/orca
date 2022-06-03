import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import App from "components/App";
import { IS_LOADED } from "constants/env";
import { configureStore } from "store";
import { hasGlobal, setGlobal } from "utils/global-util";
import { setPagesVisible } from "reducers/pages";

if (hasGlobal(IS_LOADED)) {
	throw `Orca is already loaded.`;
}

const store = configureStore();

Roact.mount(
	<Provider store={store}>
		<App />
	</Provider>,
);

// If 3 seconds passed since the game started, show the dashboard
if (time() > 3) {
	task.defer(() => store.dispatch(setPagesVisible(true)));
}

setGlobal(IS_LOADED, true);
