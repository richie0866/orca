import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import { isSolid } from "store/themes";
import { useButtonStyle } from "./use-button-style";

interface Props extends Roact.PropsWithChildren {}

function Body({ [Roact.Children]: children }: Props) {
	const currentStyle = useButtonStyle();

	return (
		<>
			<frame
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundColor3={useAnimation(
					(isSolid(currentStyle.background) && currentStyle.background.color) || new Color3(1, 1, 1),
				)}
				BackgroundTransparency={useAnimation(
					(isSolid(currentStyle.background) ? currentStyle.background.transparency : 0) ?? 0,
				)}
			>
				<Gradient color={currentStyle.background} />
				<uicorner CornerRadius={currentStyle.cornerRadius} />
			</frame>

			<InnerStroke radius={currentStyle.cornerRadius} color={currentStyle.stroke} />

			{children}
		</>
	);
}

export default hooked(Body);
