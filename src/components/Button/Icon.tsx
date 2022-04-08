import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import { isSolid } from "store/themes";
import { useButtonStyle } from "./use-button-style";

interface Props extends Roact.PropsWithChildren {
	image: string;
	size?: UDim2 | Roact.Binding<UDim2>;
}

function Icon({ image, size, [Roact.Children]: children }: Props) {
	const currentStyle = useButtonStyle();

	return (
		<imagelabel
			Image={image}
			ImageColor3={useAnimation(
				(isSolid(currentStyle.foreground) && currentStyle.foreground.color) || new Color3(1, 1, 1),
			)}
			ImageTransparency={useAnimation(
				(isSolid(currentStyle.foreground) ? currentStyle.foreground.transparency : 0) ?? 0,
			)}
			ScaleType="Slice"
			Size={size}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<Gradient color={currentStyle.background} />
			{children}
		</imagelabel>
	);
}

export default hooked(Icon);
