import Roact from "@rbxts/roact";
import { GradientColor, SolidColor } from "store/themes";
import { asBinding, mapBinding, useAnimation } from "@rbxts/roact-hooked-plus";
import { hooked } from "@rbxts/roact-hooked";
import { isSolid } from "store/themes";

interface Props extends Roact.PropsWithChildren {
	size?: number | Roact.Binding<number>;
	radius?: UDim | "circular" | Roact.Binding<UDim | "circular">;
	color?: GradientColor | SolidColor;
}

function Border({ size = 1, radius = new UDim(0, 1), color, [Roact.Children]: children }: Props) {
	return (
		<frame
			Size={mapBinding(size, (s) => new UDim2(1, -s * 2, 1, -s * 2))}
			Position={mapBinding(size, (s) => new UDim2(0, s, 0, s))}
			BackgroundTransparency={1}
		>
			<uistroke
				Thickness={size}
				Color={useAnimation((isSolid(color) && color.color) || new Color3(1, 1, 1))}
				Transparency={useAnimation((isSolid(color) ? color.transparency : 0) ?? 0)}
			>
				{children}
			</uistroke>

			<uicorner
				CornerRadius={Roact.joinBindings({ radius: asBinding(radius), size: asBinding(size) }).map(
					({ radius, size }) => (radius === "circular" ? new UDim(1, 0) : radius.sub(new UDim(0, size * 2))),
				)}
			/>
		</frame>
	);
}

export default hooked(Border);
