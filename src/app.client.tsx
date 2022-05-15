import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import App from "components/App";
import { IS_LOADED } from "constants/env";
import { configureStore } from "store";
import { getMountTarget } from "utils/get-mount-target";
import { hasGlobal, setGlobal } from "utils/global-util";
import { setPagesVisible } from "reducers/pages";

if (hasGlobal(IS_LOADED)) {
	throw `The global ${IS_LOADED} is already defined.`;
}

const store = configureStore();

Roact.mount(
	<Provider store={store}>
		<App />
	</Provider>,
	getMountTarget(),
);

// If 3 seconds passed since the game started, show the dashboard
if (time() > 3) {
	task.defer(() => store.dispatch(setPagesVisible(true)));
}

setGlobal(IS_LOADED, true);
