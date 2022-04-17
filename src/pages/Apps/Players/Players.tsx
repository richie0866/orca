import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import Card from "components/Card";
import { CARD_WIDTH } from "constants";
import { Page } from "store/pages";
import { useTheme } from "hooks/use-theme";

function Players() {
	const style = useTheme((theme) => theme.players);

	return (
		<Card
			index={0}
			align="left"
			style={style}
			page={Page.Apps}
			size={new UDim2(0, CARD_WIDTH, 0, 648)}
			position={new UDim2(0, 0, 1, 0)}
		/>
	);
}

export default pure(Players);
