import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import { BindingOrValue } from "utils/binding-util";
import { hex } from "utils/color3";
import { px, scale } from "utils/udim2";

interface Props extends Roact.PropsWithChildren {
	size?: BindingOrValue<UDim2>;
	position?: BindingOrValue<UDim2>;
	radius?: BindingOrValue<number>;
	color?: BindingOrValue<Color3>;
	borderEnabled?: boolean;
	borderColor?: BindingOrValue<Color3>;
	transparency?: BindingOrValue<number>;
	onActivate?: () => void;
	onPress?: () => void;
	onRelease?: () => void;
	onHover?: (isHovered: boolean) => void;
}

function BrightButton({
	size = px(100, 100),
	position = px(0, 0),
	radius = 8,
	color = hex("#FFFFFF"),
	borderEnabled,
	borderColor = hex("#FFFFFF"),
	transparency = 0,
	onActivate,
	onPress,
	onRelease,
	onHover,
	[Roact.Children]: children,
}: Props) {
	return (
		<Canvas size={size} position={position}>
			{/* Underglow */}
			<Glow
				radius={GlowRadius.Size70}
				color={color}
				size={new UDim2(1, 36, 1, 36)}
				position={px(-18, 5 - 18)}
				transparency={transparency}
			/>

			{/* Body */}
			<Fill color={color} radius={radius} transparency={transparency} />
			{borderEnabled && <Border color={borderColor} radius={radius} transparency={0.8} />}

			{/* Input capture */}
			<textbutton
				Text=""
				AutoButtonColor={false}
				Size={scale(1, 1)}
				BackgroundTransparency={1}
				Event={{
					Activated: () => onActivate?.(),
					MouseButton1Down: () => onPress?.(),
					MouseButton1Up: () => onRelease?.(),
					MouseEnter: () => onHover?.(true),
					MouseLeave: () => onHover?.(false),
				}}
			/>

			{children}
		</Canvas>
	);
}

export default hooked(BrightButton);
