import Roact from "@rbxts/roact";

import Card from "components/Card";
import ProfileActions from "./ProfileActions";
import ProfileActivity from "./ProfileActivity";
import ProfileHeadshot from "./ProfileHeadshot";
import ProfileName from "./ProfileName";
import { CARD_HEIGHT_75, CARD_WIDTH } from "constants";

export default function Profile() {
	return (
		<Card
			page="Home"
			align="left"
			index={1}
			getStyle={(theme) => theme.profile}
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_75)}
			position={new UDim2(0, 0, 1, 0)}
		>
			<ProfileHeadshot />
			<ProfileActivity />
			<ProfileName />
			<ProfileActions />
		</Card>
	);
}
