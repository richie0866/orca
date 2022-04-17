import Roact from "@rbxts/roact";
import { mapBinding } from "@rbxts/roact-hooked-plus";

/**
 * Images are a 50x50 px circle with layer blur
 */
export enum DropshadowBlur {
	/**
	 * Layer blur 20; buttons, sliders
	 */
	Medium = "rbxassetid://9313765853",
	/**
	 * Layer blur 48; cards, pages
	 */
	Large = "rbxassetid://9313765710",
}

export const dropshadowSize = {
	[DropshadowBlur.Medium]: new Vector2(90, 90),
	[DropshadowBlur.Large]: new Vector2(146, 146),
};

interface Props extends Roact.PropsWithChildren {
	blur?: DropshadowBlur;
	scale?: number | Roact.Binding<number>;
	color?: Color3 | Roact.Binding<Color3>;
	transparency?: number | Roact.Binding<number>;
	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;
}

export default function Dropshadow({
	blur = DropshadowBlur.Large,
	scale = 1,
	color = new Color3(),
	transparency = 0,
	size = new UDim2(1, 24, 1, 24),
	position = new UDim2(0.5, 0, 0.5, 12),
	anchorPoint = new Vector2(0.5, 1),
	[Roact.Children]: children,
}: Props) {
	const imageSize = dropshadowSize[blur];

	return (
		<imagelabel
			Image={blur}
			ImageColor3={color}
			ScaleType="Slice"
			SliceScale={scale}
			SliceCenter={new Rect(imageSize.div(2), imageSize.div(2))}
			Size={size}
			Position={position}
			AnchorPoint={anchorPoint}
			ImageTransparency={transparency}
			BackgroundTransparency={1}
		>
			<uisizeconstraint MinSize={mapBinding(scale, (s) => imageSize.mul(s))} />
			{children}
		</imagelabel>
	);
}
