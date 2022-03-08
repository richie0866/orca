import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import Card from "components/Card";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { px } from "utils/udim2";
import Actions from "./Actions";
import Avatar from "./Avatar";
import Selection from "./Selection";
import Username from "./Username";

function Players() {
	const theme = useTheme("apps").players;

	return (
		<Card index={1} page={DashboardPage.Apps} theme={theme} size={px(326, 648)} position={new UDim2(0, 0, 1, 0)}>
			<Avatar />
			<Username />
			<Actions />
			<Selection />
		</Card>
	);
}

export default hooked(Players);
