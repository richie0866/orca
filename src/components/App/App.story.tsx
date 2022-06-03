import App from "./App";
import Roact from "@rbxts/roact";
import Root from "components/Root";
import { Provider } from "@rbxts/roact-rodux-hooked";
import { configureStore } from "store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<Root>
				<imagelabel Image="rbxassetid://9492880314" Size={new UDim2(1, 0, 1, 0)} ScaleType="Crop" />
			</Root>
			<App />
		</Provider>,
		target,
		"App",
	);

	return () => {
		Roact.unmount(handle);
	};
};
