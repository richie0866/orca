import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useDelayedState } from "hooks/common/use-delayed-state";
import { useCurrentPage } from "hooks/use-current-page";
import { DashboardPage } from "store/models/dashboard.model";
import Apps from "./Apps";
import Home from "./Home";
import Options from "./Options";
import Scripts from "./Scripts";

function Pages() {
	const currentPage = useCurrentPage();
	const isScriptsVisible = useDelayedState(currentPage === DashboardPage.Scripts, 2000, (isVisible) => isVisible);

	return (
		<>
			<Home Key="home" />
			<Apps Key="apps" />
			{isScriptsVisible && <Scripts Key="scripts" />}
			<Options Key="options" />
		</>
	);
}

export default hooked(Pages);
