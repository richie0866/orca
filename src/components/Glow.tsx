import Roact from "@rbxts/roact";
import { hooked, useBinding } from "@rbxts/roact-hooked";
import { useScale } from "hooks/use-scale";
import { GradientTheme } from "themes/theme.interface";
import { asBinding, BindingOrValue } from "utils/binding-util";
import { map } from "utils/number-util";
import { applyUDim2, px } from "utils/udim2";
import Canvas from "./Canvas";

export enum GlowRadius {
	Size70 = "rbxassetid://8992230903",
	Size146 = "rbxassetid://8992584561",
	Size198 = "rbxassetid://8992230677",
}

export const RADIUS_TO_CENTER_OFFSET: Record<GlowRadius, number> = {
	[GlowRadius.Size70]: 70 / 2,
	[GlowRadius.Size146]: 146 / 2,
	[GlowRadius.Size198]: 198 / 2,
};

interface Props extends Roact.PropsWithChildren {
	radius: GlowRadius;
	size: BindingOrValue<UDim2>;
	position: BindingOrValue<UDim2>;
	color?: BindingOrValue<Color3>;
	gradient?: GradientTheme;
	transparency?: BindingOrValue<number>;
	maintainCornerRadius?: boolean;
}

function Glow({
	radius,
	size,
	position,
	color,
	gradient,
	transparency = 0,
	maintainCornerRadius,
	[Roact.Children]: children,
}: Props) {
	const [absoluteSize, setAbsoluteSize] = useBinding(new Vector2());
	const scaleFactor = useScale();
	const centerOffset = RADIUS_TO_CENTER_OFFSET[radius];

	// When the size gets too small, Roblox automatically decreases the corner
	// radius. This binding makes sure the glow effect never reaches that point.
	const sizeModifier = maintainCornerRadius
		? Roact.joinBindings({
				absoluteSize,
				scaleFactor,
				size: asBinding(size),
		  }).map(({ absoluteSize, size, scaleFactor }) => {
				const currentSize = applyUDim2(absoluteSize, size, scaleFactor);
				return px(math.max(currentSize.X, centerOffset * 2), math.max(currentSize.Y, centerOffset * 2));
		  })
		: size;

	// As the glow size reaches the minimum size, decrease the transparency.
	// Ignores offset when calculating the current size, and only uses the X-axis.
	// Intended for the Slider component!!
	const transparencyModifier = maintainCornerRadius
		? Roact.joinBindings({
				absoluteSize,
				scaleFactor,
				size: asBinding(size),
				transparency: asBinding(transparency),
		  }).map(({ absoluteSize, size, transparency, scaleFactor }) => {
				const minSize = centerOffset * 2;
				const currentSize = applyUDim2(
					absoluteSize,
					UDim2.fromScale(size.X.Scale, size.Y.Scale),
					scaleFactor,
				).X;
				if (currentSize < minSize) {
					return 1 - (1 - transparency) * map(currentSize, 0, minSize, 0, 1);
				} else {
					return transparency;
				}
		  })
		: transparency;

	return (
		<Canvas
			onChange={{ AbsoluteSize: maintainCornerRadius ? (rbx) => setAbsoluteSize(rbx.AbsoluteSize) : undefined }}
		>
			<imagelabel
				Image={radius}
				ImageColor3={color}
				ImageTransparency={transparencyModifier}
				ScaleType="Slice"
				SliceCenter={new Rect(new Vector2(centerOffset, centerOffset), new Vector2(centerOffset, centerOffset))}
				SliceScale={scaleFactor.map((factor) => factor * 0.1 + 0.9)}
				Size={sizeModifier}
				Position={position}
				BackgroundTransparency={1}
			>
				{gradient && (
					<uigradient
						Key="gradient"
						Color={gradient.color}
						Transparency={gradient.transparency}
						Rotation={gradient.rotation}
					/>
				)}
				{children}
			</imagelabel>
		</Canvas>
	);
}

export default hooked(Glow);
