import Roact from "@rbxts/roact";
import { clearInterval, setInterval, useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";
import { pure, useBinding, useEffect } from "@rbxts/roact-hooked";

import Gradient from "components/Gradient";
import { CARD_INNER_MARGIN } from "constants/app";
import { Spring } from "@rbxts/flipper";
import { asColor, asTransparency, multiplyTransparency } from "reducers/themes";
import { usePageOpen } from "hooks/use-page-open";
import { useTheme } from "hooks/use-theme";

interface Props {
	icon: string;
	order: number;
	position: number;
	description: string;
	getText: () => string;
}

const getOffset = (visibility: number) => math.floor((1 - visibility) * CARD_INNER_MARGIN * 2);

function SessionCaption({ icon, order, position, description, getText }: Props) {
	const foreground = useTheme((theme) => theme.session.foreground);
	const visible = usePageOpen("Home");

	const [text, setText] = useBinding(getText());

	const [visibility, setVisibility] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => setVisibility(new Spring(visible ? 1 : 0, { frequency: 4 })),
		visible ? 330 + order * 60 : 300,
		[visible],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setText(getText());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} ClipsDescendants>
			<imagelabel
				Image={icon}
				ImageColor3={asColor(foreground)}
				ImageTransparency={visibility.map((n) => multiplyTransparency(asTransparency(foreground), 1 - n))}
				Size={new UDim2(0, 24, 0, 24)}
				Position={visibility.map((n) => new UDim2(0, CARD_INNER_MARGIN - getOffset(n), 0, position))}
				BackgroundTransparency={1}
			>
				<Gradient color={foreground} />
			</imagelabel>

			<textlabel
				Text={description}
				Font="GothamBold"
				TextXAlignment="Left"
				TextYAlignment="Center"
				TextColor3={asColor(foreground)}
				TextTransparency={visibility.map((n) => multiplyTransparency(asTransparency(foreground), 1 - n))}
				TextSize={15}
				Size={new UDim2(1, -CARD_INNER_MARGIN * 2, 0, 24)}
				Position={visibility.map((n) => new UDim2(0, CARD_INNER_MARGIN - getOffset(n), 0, position))}
				BackgroundTransparency={1}
			>
				<uipadding PaddingLeft={new UDim(0, 32)} />
				<Gradient color={foreground} />
			</textlabel>

			<textlabel
				Text={text}
				Font="GothamBold"
				TextXAlignment="Right"
				TextYAlignment="Center"
				TextColor3={asColor(foreground)}
				TextTransparency={visibility.map((n) => multiplyTransparency(asTransparency(foreground), 1 - n, 0.5))}
				TextSize={15}
				Size={new UDim2(1, -CARD_INNER_MARGIN * 2, 0, 24)}
				Position={visibility.map((n) => new UDim2(0, CARD_INNER_MARGIN + getOffset(n), 0, position))}
				BackgroundTransparency={1}
			>
				<Gradient color={foreground} />
			</textlabel>
		</frame>
	);
}

export default pure(SessionCaption);
