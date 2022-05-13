import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import { asColor, asTransparency } from "reducers/themes";
import { useButtonStyle } from "./use-button-style";

interface Props extends Roact.PropsWithChildren {
	text: string;
	textSize?: number | Roact.Binding<number>;
	textFont?: Roact.InferEnumNames<Enum.Font>;
	position?: UDim2 | Roact.Binding<UDim2>;
}

function ButtonText({
	text,
	textSize,
	textFont,
	position = new UDim2(0.5, 0, 0.5, 0),
	[Roact.Children]: children,
}: Props) {
	const currentStyle = useButtonStyle();

	return (
		<textlabel
			Text={text}
			TextSize={textSize}
			Font={textFont}
			TextColor3={useAnimation(asColor(currentStyle.foreground))}
			TextTransparency={useAnimation(asTransparency(currentStyle.foreground))}
			TextXAlignment="Center"
			TextYAlignment="Center"
			Position={position}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<Gradient color={currentStyle.background} />
			{children}
		</textlabel>
	);
}

export default hooked(ButtonText);
