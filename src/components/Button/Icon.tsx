import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import { asColor, asTransparency } from "store/themes";
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
			ImageColor3={useAnimation(asColor(currentStyle.foreground))}
			ImageTransparency={useAnimation(asTransparency(currentStyle.foreground))}
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
