import Roact from "@rbxts/roact";

import Config from "./Config";
import Page from "components/Page";
import Shortcuts from "./Shortcuts";
import Themes from "./Themes";

export default function Settings() {
	return (
		<Page>
			<Themes />
			<Shortcuts />
			<Config />
		</Page>
	);
}
