import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import { CARD_INNER_MARGIN } from "constants/app";
import { asColor, asTransparency, multiplyTransparency } from "reducers/themes";
import { useCardContext } from "./use-card-context";
import { usePageOpen } from "hooks/use-page-open";

interface Props {
	text: string;
	delayMs?: number;
}

const POSITION = new UDim2(0, CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN);
const POSITION_HIDDEN = new UDim2(0, -CARD_INNER_MARGIN, 0, CARD_INNER_MARGIN);

function CardCaption({ text, delayMs = 100 }: Props) {
	const { style, page } = useCardContext();
	const visible = usePageOpen(page);

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
			TextColor3={asColor(style.foreground)}
			TextTransparency={
				page !== undefined
					? visibility.map((n) => multiplyTransparency(asTransparency(style.foreground), 1 - n))
					: asTransparency(style.foreground)
			}
			TextXAlignment="Left"
			TextYAlignment="Top"
			Size={new UDim2(1, 0, 0, 20)}
			Position={page !== undefined ? visibility.map((n) => POSITION_HIDDEN.Lerp(POSITION, n)) : POSITION}
			BackgroundTransparency={1}
		>
			<Gradient color={style.foreground} />
		</textlabel>
	);
}

export default pure(CardCaption);
