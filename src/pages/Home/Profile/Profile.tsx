import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import Card from "components/Card";
import ProfileActions from "./ProfileActions";
import ProfileActivity from "./ProfileActivity";
import ProfileHeadshot from "./ProfileHeadshot";
import ProfileName from "./ProfileName";
import { CARD_WIDTH } from "constants";
import { Page } from "store/pages";
import { useTheme } from "hooks/use-theme";

function Profile() {
	const style = useTheme((theme) => theme.profile);

	return (
		<Card
			index={1}
			align="left"
			style={style}
			page={Page.Home}
			size={new UDim2(0, CARD_WIDTH, 0, 648)}
			position={new UDim2(0, 0, 1, 0)}
		>
			<ProfileHeadshot />
			<ProfileActivity />
			<ProfileName />
			<ProfileActions />
		</Card>
	);
}

export default pure(Profile);
