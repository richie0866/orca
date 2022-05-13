import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { UserInputService } from "@rbxts/services";
import { hooked, useBinding, useCallback, useMemo, useMutable, useState } from "@rbxts/roact-hooked";
import { useEvent, useSingleMotor } from "@rbxts/roact-hooked-plus";

import { SliderStyle } from "reducers/themes";
import { SliderStyleContext } from "./use-slider-style";
import { mapStrict } from "utils/number-util";

interface Props extends Roact.PropsWithChildren {
	onHover?: (hover: boolean) => void;
	onClick?: () => void;
	onChange?: (value: number) => void;

	min: number;
	max: number;
	defaultValue: number;

	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;

	active?: boolean;
	style: SliderStyle;
}

function Slider({
	onHover,
	onClick,
	onChange,
	min,
	max,
	defaultValue,
	size,
	position,
	anchorPoint,
	active,
	style,
	[Roact.Children]: children,
}: Props) {
	const [hovered, setHovered] = useState(false);
	const [percent, setPercent] = useBinding(mapStrict(defaultValue, min, max, 0, 1));
	const [percentSpring, setPercentSpring] = useSingleMotor(mapStrict(defaultValue, min, max, 0, 1));

	const isDragging = useMutable(false);
	const frameStart = useMutable(new Vector2());
	const frameSize = useMutable(new Vector2());

	const currentStyle = useMemo(() => {
		return {
			...style,
			...(hovered && style.$hover),
			...(active && style.$active),
		};
	}, [style, active, hovered]);

	const updatePercent = useCallback((mouse: Vector2) => {
		const percent = mapStrict(mouse.X, frameStart.current.X, frameStart.current.X + frameSize.current.X, 0, 1);
		setPercent(percent);
		setPercentSpring(new Spring(percent, { frequency: 8 }));
	}, []);

	useEvent(UserInputService.InputChanged, (input) => {
		if (input.UserInputType === Enum.UserInputType.MouseMovement && isDragging.current) {
			updatePercent(new Vector2(input.Position.X, input.Position.Y));
		}
	});

	useEvent(UserInputService.InputEnded, (input) => {
		if (input.UserInputType === Enum.UserInputType.MouseButton1 && isDragging.current) {
			isDragging.current = false;
			onChange?.(mapStrict(percent.getValue(), 0, 1, min, max));
		}
	});

	return (
		<SliderStyleContext.Provider value={{ style: currentStyle, percent: percentSpring, min, max }}>
			<textbutton
				Event={{
					Activated: onClick,
					MouseButton1Down: (_, x, y) => {
						isDragging.current = true;
						updatePercent(new Vector2(x, y));
						onChange?.(mapStrict(percent.getValue(), 0, 1, min, max));
					},
					MouseEnter: () => {
						setHovered(true);
						onHover?.(true);
					},
					MouseLeave: () => {
						setHovered(false);
						onHover?.(false);
					},
				}}
				Change={{
					AbsolutePosition: (rbx) => (frameStart.current = rbx.AbsolutePosition),
					AbsoluteSize: (rbx) => (frameSize.current = rbx.AbsoluteSize),
				}}
				Text=""
				Size={size}
				Position={position}
				AnchorPoint={anchorPoint}
				BackgroundTransparency={1}
			>
				{children}
			</textbutton>
		</SliderStyleContext.Provider>
	);
}

export default hooked(Slider);
