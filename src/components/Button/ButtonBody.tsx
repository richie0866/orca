import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import { asColor, asTransparency } from "reducers/themes";
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

			{currentStyle.stroke && <InnerStroke color={currentStyle.stroke} radius={currentStyle.cornerRadius} />}
		</>
	);
}

export default hooked(ButtonBody);
