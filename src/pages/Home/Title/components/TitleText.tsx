import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import { asColor, asTransparency, multiplyTransparency } from "store/themes";
import { usePageOpen } from "hooks/use-page-open";
import { useTheme } from "hooks/use-theme";

const DELAY = 60;
const DELAY_START = 200;

interface Props {
	id: number;
	text: string;
	transparency?: number;
	alignment?: Roact.InferEnumNames<Enum.TextYAlignment>;
	position: UDim2;
}

function TitleText({ id, text, position, transparency = 0, alignment = "Top" }: Props) {
	const style = useTheme((theme) => theme.title);
	const visible = usePageOpen("Home");

	const [visibility, setGoal] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setGoal(new Spring(visible ? 1 : 0, { frequency: 3 }));
		},
		visible ? DELAY_START + DELAY * id : 0,
		[visible],
	);

	return (
		<textlabel
			Text={text}
			Font="GothamBold"
			TextSize={16}
			TextXAlignment="Left"
			TextYAlignment={alignment}
			TextColor3={asColor(style.foreground)}
			TextTransparency={visibility.map((n) =>
				multiplyTransparency(1 - n, transparency, asTransparency(style.foreground)),
			)}
			AnchorPoint={alignment === "Top" ? new Vector2(0, 0) : new Vector2(0, 1)}
			Size={new UDim2(0, 200, 0, 24)}
			Position={visibility.map((n) => position.sub(new UDim2(0, 24, 0, 0)).Lerp(position, n))}
			BackgroundTransparency={1}
		/>
	);
}

export default pure(TitleText);
