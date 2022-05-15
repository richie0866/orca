import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import Navbar from "./Navbar";
import { configureStore } from "store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<Navbar />
		</Provider>,
		target,
		"Clock",
	);

	return () => {
		Roact.unmount(handle);
	};
};
