import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import Clock from "./Clock";
import { configureStore } from "store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<Clock />
		</Provider>,
		target,
		"Clock",
	);

	return () => {
		Roact.unmount(handle);
	};
};
