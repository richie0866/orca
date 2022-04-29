import Roact from "@rbxts/roact";

import Page from "components/Page";

import Friends from "./Friends";
import Profile from "./Profile";
import Server from "./Server";
import Session from "./Session";
import Title from "./Title";

export default function Home() {
	return (
		<Page>
			<Session />
			<Friends />
			<Title />
			<Profile />
			<Server />
		</Page>
	);
}
