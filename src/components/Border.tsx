import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { asBinding, BindingOrValue, mapBinding } from "utils/binding-util";
import { hex } from "utils/color3";
import { px } from "utils/udim2";

interface Props extends Roact.PropsWithChildren {
	size?: BindingOrValue<number>;
	radius?: BindingOrValue<number | "circular">;
	color?: BindingOrValue<Color3>;
	transparency?: BindingOrValue<number>;
}

function Border({ size = 1, radius = 0, color = hex("#ffffff"), transparency = 0, [Roact.Children]: children }: Props) {
	return (
		<frame
			Size={mapBinding(size, (s) => new UDim2(1, -s * 2, 1, -s * 2))}
			Position={mapBinding(size, (s) => px(s, s))}
			BackgroundTransparency={1}
		>
			<uistroke Thickness={size} Color={color} Transparency={transparency}>
				{children}
			</uistroke>
			<uicorner
				CornerRadius={Roact.joinBindings({ radius: asBinding(radius), size: asBinding(size) }).map(
					({ radius, size }) => (radius === "circular" ? new UDim(1, 0) : new UDim(0, radius - size * 2)),
				)}
			/>
		</frame>
	);
}

export default hooked(Border);
