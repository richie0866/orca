import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { px } from "utils/udim2";
import Actions from "./Actions";
import Avatar from "./Avatar";
import Info from "./Info";
import Sliders from "./Sliders";
import Username from "./Username";

function Profile() {
	const theme = useTheme("home").profile;

	return (
		<Card index={1} page={DashboardPage.Home} theme={theme} size={px(326, 648)} position={new UDim2(0, 0, 1, 0)}>
			<Canvas padding={{ left: 24, right: 24 }}>
				<Avatar />
				<Username />
				<Info />
				<Sliders />
				<Actions />
			</Canvas>
		</Card>
	);
}

export default hooked(Profile);
