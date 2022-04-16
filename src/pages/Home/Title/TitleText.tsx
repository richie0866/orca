import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import { Page } from "store/pages";
import { asColor, asTransparency } from "store/themes";
import { useRootSelector } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

const DELAY = 80;
const DELAY_START = 250;

interface Props {
	id: number;
	text: string;
	position: UDim2;
	font?: Roact.InferEnumNames<Enum.Font>;
	size?: number;
	transparency?: number;
}

function TitleText({ id, text, font = "GothamBold", size = 16, position, transparency = 0 }: Props) {
	const style = useTheme((theme) => theme.title);
	const visible = useRootSelector((state) => state.pages.visible && state.pages.currentPage === Page.Home);

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
			Font={font}
			TextSize={size}
			TextXAlignment="Left"
			TextYAlignment="Top"
			TextColor3={asColor(style.foreground)}
			TextTransparency={visibility.map(
				(n) => 1 - n * (1 - transparency) * (1 - asTransparency(style.foreground)),
			)}
			Size={new UDim2(0, 200, 0, 24)}
			Position={visibility.map((n) => position.sub(new UDim2(0, 24, 0, 0)).Lerp(position, n))}
			BackgroundTransparency={1}
		/>
	);
}

export default pure(TitleText);
