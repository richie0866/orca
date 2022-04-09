import Dropshadow, { DropshadowBlur } from "components/Dropshadow";
import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import { asColor, asTransparency } from "store/themes";
import { useButtonStyle } from "./use-button-style";

interface Props extends Roact.PropsWithChildren {
	blur?: DropshadowBlur;
	scale?: number | Roact.Binding<number>;
	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;
}

function Shadow({
	blur = DropshadowBlur.Medium,
	scale,
	size = new UDim2(0, 16, 0, 16),
	position = new UDim2(0.5, 0, 0.5, 12),
	anchorPoint,
	[Roact.Children]: children,
}: Props) {
	const currentStyle = useButtonStyle();

	return (
		<Dropshadow
			blur={blur}
			scale={scale}
			color={useAnimation(asColor(currentStyle.dropshadow))}
			transparency={useAnimation(asTransparency(currentStyle.dropshadow))}
			size={size}
			position={position}
			anchorPoint={anchorPoint}
		>
			<Gradient color={currentStyle.background} />
			{children}
		</Dropshadow>
	);
}

export default hooked(Shadow);
