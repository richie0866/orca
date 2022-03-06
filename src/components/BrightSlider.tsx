import { Spring } from "@rbxts/flipper";
import Roact from "@rbxts/roact";
import { hooked, useCallback, useEffect, useState } from "@rbxts/roact-hooked";
import { UserInputService } from "@rbxts/services";
import { getBinding, SpringOptions, useMotor } from "hooks/common/flipper-hooks";
import { px, scale } from "utils/udim2";
import Border from "./Border";
import Canvas from "./Canvas";
import Fill from "./Fill";
import Glow, { GlowRadius } from "./Glow";

// Spring options for the slider animation
const SPRING_OPTIONS: SpringOptions = { frequency: 8 };

interface Props extends Roact.PropsWithChildren {
	min: number;
	max: number;
	initialValue: number;
	size?: UDim2;
	position?: UDim2;
	radius?: number;
	color?: Color3;
	accentColor?: Color3;
	borderEnabled?: boolean;
	borderColor?: Color3;
	transparency?: number;
	indicatorTransparency?: number;
	onValueChanged?: (value: number) => void;
	onRelease?: (value: number) => void;
}

function BrightSlider({
	min,
	max,
	initialValue,
	size,
	position,
	radius,
	color,
	accentColor,
	borderEnabled,
	borderColor,
	transparency,
	indicatorTransparency,
	onValueChanged,
	onRelease,
	[Roact.Children]: children,
}: Props) {
	const valueMotor = useMotor(initialValue);
	const valueBinding = getBinding(valueMotor);

	useEffect(() => {
		onValueChanged?.(initialValue);
	}, []);

	// clean-up
	useEffect(() => () => valueMotor.destroy(), []);

	return (
		<Canvas size={size} position={position}>
			{/* Underglow */}
			<Glow
				radius={GlowRadius.Size70}
				color={accentColor}
				size={valueBinding.map((v) => new UDim2((v - min) / (max - min), 36, 1, 36))}
				position={px(-18, 5 - 18)}
				transparency={0}
				maintainCornerRadius
			/>

			{/* Body */}
			<Fill color={color} radius={radius} transparency={transparency} />

			{/* Slider */}
			<Canvas size={valueBinding.map((v) => scale((v - min) / (max - min), 1))} clipsDescendants>
				<frame Size={size} BackgroundColor3={accentColor} BackgroundTransparency={indicatorTransparency}>
					<uicorner CornerRadius={new UDim(0, radius)} />
				</frame>
			</Canvas>

			{/* Overlapping border */}
			{borderEnabled && <Border color={borderColor} radius={radius} transparency={0.8} />}

			{/* Input handle */}
			<Drag
				onChange={(alpha) => {
					valueMotor.setGoal(new Spring(alpha * (max - min) + min, SPRING_OPTIONS));
					onValueChanged?.(alpha * (max - min) + min);
				}}
				onRelease={(alpha) => onRelease?.(alpha * (max - min) + min)}
			/>
			{children}
		</Canvas>
	);
}

export default hooked(BrightSlider);

function DragComponent({
	onChange,
	onRelease,
}: {
	onChange: (value: number) => void;
	onRelease: (value: number) => void;
}) {
	const [inputHandle, setHandle] = useState<RBXScriptConnection>();

	const updateValue = useCallback((alpha: number) => {
		alpha = math.clamp(alpha, 0, 1);
		onChange(alpha);
	}, []);

	const getValueFromPosition = useCallback((x: number, rbx: GuiObject) => {
		return (x - rbx.AbsolutePosition.X) / rbx.AbsoluteSize.X;
	}, []);

	// clean-up
	useEffect(
		() => () => {
			inputHandle?.Disconnect();
		},
		[],
	);

	return (
		<frame
			Active
			Size={scale(1, 1)}
			BackgroundTransparency={1}
			Event={{
				InputBegan: (rbx, input) => {
					if (input.UserInputType === Enum.UserInputType.MouseButton1) {
						inputHandle?.Disconnect();
						const handle = UserInputService.InputChanged.Connect((input) => {
							if (input.UserInputType === Enum.UserInputType.MouseMovement) {
								updateValue(getValueFromPosition(input.Position.X, rbx));
							}
						});
						setHandle(handle);
						updateValue(getValueFromPosition(input.Position.X, rbx));
					}
				},
				InputEnded: (rbx, input) => {
					if (input.UserInputType === Enum.UserInputType.MouseButton1) {
						inputHandle?.Disconnect();
						setHandle(undefined);
						onRelease(getValueFromPosition(input.Position.X, rbx));
					}
				},
			}}
		/>
	);
}

const Drag = hooked(DragComponent);
