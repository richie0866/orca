import Gradient from "components/Gradient";
import Roact from "@rbxts/roact";
import { GradientColor, SolidColor, asColor, asTransparency, multiplyTransparency } from "reducers/themes";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";
import { usePageOpen } from "hooks/use-page-open";

interface Props {
	index: number;
	color: SolidColor | GradientColor;
	text: string;
	enabled: boolean;
	size: UDim2;
	position: UDim2;
}

function ProfileCaption({ index, color, text, enabled, size, position }: Props) {
	const visible = usePageOpen("Home");

	const [visibility, setVisibility] = useSingleMotor(enabled && visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setVisibility(new Spring(enabled && visible ? 1 : 0));
		},
		visible ? 400 + index * 100 : 200,
		[visible, enabled],
	);

	return (
		<textlabel
			Text={text}
			Font="GothamBold"
			TextSize={13}
			TextXAlignment="Center"
			TextYAlignment="Center"
			TextColor3={asColor(color)}
			TextTransparency={visibility.map((n) => multiplyTransparency(1 - n, 0.2, asTransparency(color)))}
			Size={size}
			Position={visibility.map((n) => position.sub(new UDim2(0, 0, 0, 20)).Lerp(position, n))}
			BackgroundTransparency={1}
		>
			<Gradient color={color} />
		</textlabel>
	);
}

export default pure(ProfileCaption);
