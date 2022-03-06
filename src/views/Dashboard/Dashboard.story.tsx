import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";
import { DashboardPage } from "store/models/dashboard.model";
import { configureStore } from "store/store";
import Dashboard from "./Dashboard";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider
			store={configureStore({
				dashboard: {
					isOpen: true,
					page: DashboardPage.Home,
					hint: undefined,
					apps: {},
				},
			})}
		>
			<Dashboard />
		</Provider>,
		target,
		"Dashboard",
	);
	return () => Roact.unmount(handle);
};
