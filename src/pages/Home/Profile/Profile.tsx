import Roact from "@rbxts/roact";

import Card from "components/Card";
import ProfileCaptions from "./ProfileCaptions";
import ProfileHeadshot from "./ProfileHeadshot";
import ProfileName from "./ProfileName";
import ProfileSliders from "./ProfileSliders";
import ProfileSwitches from "./ProfileSwitches";
import { CARD_HEIGHT_75, CARD_WIDTH } from "constants/app";

export default function Profile() {
	return (
		<Card.Root
			name="profile"
			page="Home"
			order={1}
			align="left"
			size={new UDim2(0, CARD_WIDTH, 0, CARD_HEIGHT_75)}
			position={new UDim2(0, 0, 1, 0)}
		>
			<Card.Body />
			<ProfileHeadshot />
			<ProfileCaptions />
			<ProfileName />
			<ProfileSliders />
			<ProfileSwitches />
		</Card.Root>
	);
}
