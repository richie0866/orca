import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import Card from "components/Card";
import { CARD_WIDTH } from "constants";
import { Page } from "store/pages";
import { useTheme } from "hooks/use-theme";

function Shortcuts() {
	const style = useTheme((theme) => theme.shortcuts);

	return (
		<Card
			index={1}
			align="left"
			style={style}
			page={Page.Settings}
			size={new UDim2(0, CARD_WIDTH, 0, 416)}
			position={new UDim2(0, 0, 1, 0)}
		/>
	);
}

export default pure(Shortcuts);
