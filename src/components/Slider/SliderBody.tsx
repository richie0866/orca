import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import { asColor, asTransparency } from "reducers/themes";
import { useSliderStyle } from "./use-slider-style";

function SliderBody(props: Roact.PropsWithChildren) {
	const { style: currentStyle, percent } = useSliderStyle();

	return (
		<>
			<frame
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundColor3={useAnimation(asColor(currentStyle.background))}
				BackgroundTransparency={useAnimation(asTransparency(currentStyle.background))}
				BorderSizePixel={0}
			>
				<Gradient color={currentStyle.background} />
				<uicorner CornerRadius={currentStyle.cornerRadius} />
			</frame>

			<frame Size={percent.map((n) => new UDim2(n, 0, 1, 0))} BackgroundTransparency={1} ClipsDescendants>
				<frame
					Size={percent.map((n) => new UDim2(1 / n, 0, 1, 0))}
					BackgroundColor3={useAnimation(asColor(currentStyle.slider))}
					BackgroundTransparency={useAnimation(asTransparency(currentStyle.slider))}
					BorderSizePixel={0}
				>
					<Gradient color={currentStyle.slider} />
					<uicorner CornerRadius={currentStyle.cornerRadius} />
				</frame>

				{props[Roact.Children]}
			</frame>

			{currentStyle.stroke && <InnerStroke color={currentStyle.stroke} radius={currentStyle.cornerRadius} />}
		</>
	);
}

export default hooked(SliderBody);
