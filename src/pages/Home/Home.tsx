import Roact from "@rbxts/roact";

import Friends from "./Friends";
import Page from "components/Page";
import Profile from "./Profile";
import Server from "./Server";
import Title from "./Title";

export default function Home() {
	return (
		<Page>
			<Server />
			<Friends />
			<Title />
			<Profile />
		</Page>
	);
}
