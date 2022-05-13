import Gradient from "./Gradient";
import Roact from "@rbxts/roact";
import { GradientColor, SolidColor, asColor, asTransparency } from "reducers/themes";
import { asBinding, mapBinding } from "@rbxts/roact-hooked-plus";

interface Props extends Roact.PropsWithChildren {
	size?: number | Roact.Binding<number>;
	radius?: UDim | Roact.Binding<UDim>;
	color?: SolidColor | GradientColor;
}

export default function InnerStroke({ size = 1, radius = new UDim(0, 1), color, [Roact.Children]: children }: Props) {
	return (
		<frame
			Size={mapBinding(size, (s) => new UDim2(1, -s * 2, 1, -s * 2))}
			Position={mapBinding(size, (s) => new UDim2(0, s, 0, s))}
			BackgroundTransparency={1}
		>
			<uistroke Thickness={size} Color={asColor(color)} Transparency={asTransparency(color)}>
				<Gradient color={color} />
				{children}
			</uistroke>

			<uicorner
				CornerRadius={Roact.joinBindings({ radius: asBinding(radius), size: asBinding(size) }).map(
					({ radius, size }) => radius.sub(new UDim(0, size + 2)),
				)}
			/>
		</frame>
	);
}
