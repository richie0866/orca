import Roact from "@rbxts/roact";
import { GradientColor, SolidColor, isGradient } from "reducers/themes";

interface Props {
	color?: GradientColor | SolidColor;
}

export default function Gradient({ color }: Props) {
	return (
		<>
			{isGradient(color) && (
				<uigradient Color={color.color} Transparency={color.transparency} Rotation={color.rotation} />
			)}
		</>
	);
}
