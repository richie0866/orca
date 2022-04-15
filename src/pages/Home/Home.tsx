import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import Friends from "./Friends";
import Page from "components/Page";
import Profile from "./Profile";
import Server from "./Server";
import Title from "./Title";

function Home() {
	return (
		<Page>
			<Server />
			<Friends />
			<Title />
			<Profile />
		</Page>
	);
}

export default pure(Home);
