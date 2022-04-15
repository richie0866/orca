import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import App from "./App";
import { configureStore } from "store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<App />
		</Provider>,
		target,
		"App",
	);

	return () => {
		Roact.unmount(handle);
	};
};
