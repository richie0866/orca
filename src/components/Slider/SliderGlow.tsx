import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { mapBinding, useAnimation } from "@rbxts/roact-hooked-plus";

import Dropshadow, { DropshadowBlur, dropshadowSize } from "components/Dropshadow";
import Gradient from "components/Gradient";
import { asColor, asTransparency, multiplyTransparency } from "reducers/themes";
import { mapStrict } from "utils/number-util";
import { useSliderStyle } from "./use-slider-style";

interface Props extends Roact.PropsWithChildren {
	blur?: DropshadowBlur;
	scale?: number | Roact.Binding<number>;
	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;
}

function SliderGlow({
	blur = DropshadowBlur.Medium,
	scale,
	size = new UDim2(0, 16, 0, 16),
	position = new UDim2(0.5, 0, 0.5, 12),
	anchorPoint,
	[Roact.Children]: children,
}: Props) {
	const { style: currentStyle, percent } = useSliderStyle();

	const imageSize = dropshadowSize[blur];

	return (
		<>
			{currentStyle.glow && (
				<frame Size={percent.map((n) => new UDim2(n, 0, 1, 0))} BackgroundTransparency={1}>
					<Dropshadow
						blur={blur}
						scale={scale}
						color={useAnimation(asColor(currentStyle.glow))}
						transparency={Roact.joinBindings([
							useAnimation(asTransparency(currentStyle.glow)),
							percent,
						]).map(([t, p]) => multiplyTransparency(t, 1 - mapStrict(p, 0, 0.5, 0, 1)))}
						size={size}
						position={position}
						anchorPoint={anchorPoint}
					>
						<Gradient color={currentStyle.glow} />
						{children}
					</Dropshadow>

					<uisizeconstraint MinSize={mapBinding(scale, (s = 1) => new Vector2(imageSize.mul(s).X / 3, 0))} />
				</frame>
			)}
		</>
	);
}

export default hooked(SliderGlow);
