import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import { CARD_INNER_MARGIN } from "constants";
import { GradientColor, SolidColor, Theme, asColor, asTransparency, multiplyTransparency } from "store/themes";
import { Page } from "store/pages";
import { useRootSelector } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

interface Props {
	getColor: (theme: Theme) => SolidColor | GradientColor;
	text: string;
	page?: Page;
	delayMs?: number;
}

const TITLE_POSITION = new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN);
const TITLE_POSITION_HIDDEN = new UDim2(0, -CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN);

function CardHeader({ getColor, text, page, delayMs = 200 }: Props) {
	const color = useTheme(getColor);

	const visible = useRootSelector(
		(state) => page !== undefined && state.pages.visible && state.pages.currentPage === page,
	);

	const [visibility, setGoal] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setGoal(new Spring(visible ? 1 : 0, { frequency: 3 }));
		},
		visible ? delayMs : 0,
		[visible],
	);

	return (
		<textlabel
			Text={text}
			Font="GothamBlack"
			TextSize={19}
			TextColor3={asColor(color)}
			TextTransparency={
				page !== undefined
					? visibility.map((n) => multiplyTransparency(asTransparency(color), 1 - n))
					: asTransparency(color)
			}
			TextXAlignment="Left"
			TextYAlignment="Top"
			Size={new UDim2(1, 0, 0, 20)}
			Position={
				page !== undefined
					? visibility.map((n) => TITLE_POSITION_HIDDEN.Lerp(TITLE_POSITION, n))
					: TITLE_POSITION
			}
			BackgroundTransparency={1}
		>
			<Gradient color={color} />
		</textlabel>
	);
}

export default pure(CardHeader);
