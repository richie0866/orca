import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import { asColor, asTransparency } from "store/themes";
import { useButtonStyle } from "./use-button-style";

function ButtonBody(props: Roact.PropsWithChildren) {
	const currentStyle = useButtonStyle();

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
				{props[Roact.Children]}
			</frame>

			{currentStyle.stroke && (
				<InnerStroke
					color={useAnimation(asColor(currentStyle.stroke))}
					transparency={useAnimation(asTransparency(currentStyle.stroke))}
					size={1}
					radius={currentStyle.cornerRadius}
				>
					<Gradient color={currentStyle.stroke} />
				</InnerStroke>
			)}
		</>
	);
}

export default hooked(ButtonBody);
