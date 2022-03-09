import Roact from "@rbxts/roact";
import { hooked, useEffect } from "@rbxts/roact-hooked";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import ParallaxImage from "components/ParallaxImage";
import { SpringOptions } from "hooks/common/flipper-hooks";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useIsMount } from "hooks/common/use-did-mount";
import { useForcedUpdate } from "hooks/common/use-forced-update";
import useSetState from "hooks/common/use-set-state";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { useParallaxOffset } from "hooks/use-parallax-offset";
import { DashboardPage } from "store/models/dashboard.model";
import { hex } from "utils/color3";
import { scale } from "utils/udim2";

interface Props extends Roact.PropsWithChildren {
	index: number;
	backgroundImage: string;
	backgroundImageSize: Vector2;
	dropshadow: string;
	dropshadowSize: Vector2;
	dropshadowPosition: Vector2;
	anchorPoint?: Vector2;
	size: UDim2;
	position: UDim2;
	onActivate: () => void;
}

const shineSpringOptions: SpringOptions = {
	dampingRatio: 3,
	frequency: 2,
};

function ScriptCard({
	index,
	backgroundImage,
	backgroundImageSize,
	dropshadow,
	dropshadowSize,
	dropshadowPosition,
	anchorPoint,
	size,
	position,
	onActivate,
	[Roact.Children]: children,
}: Props) {
	const rerender = useForcedUpdate();

	const isCurrentlyOpen = useIsPageOpen(DashboardPage.Scripts);
	const isOpen = useIsMount() ? false : isCurrentlyOpen;
	const isTransitioning = useDelayedUpdate(isOpen, index * 30);

	// Force a rerender to start the intro transition
	useEffect(() => rerender(), []);

	const offset = useParallaxOffset();

	const [{ isHovered, isPressed }, setButtonState] = useSetState({ isHovered: false, isPressed: false });

	return (
		<Canvas
			anchor={anchorPoint}
			size={size}
			position={useSpring(isTransitioning ? position : position.add(new UDim2(0, 0, 1, 48 * 3 + 56)), {
				frequency: 2.2,
				dampingRatio: 0.75,
			})}
		>
			{/* Body */}
			<Canvas
				anchor={new Vector2(0.5, 0.5)}
				size={useSpring(isHovered && !isPressed ? new UDim2(1, 48, 1, 48) : scale(1, 1), {
					frequency: 2,
				})}
				position={scale(0.5, 0.5)}
			>
				{/* Dropshadow */}
				<imagelabel
					Image={dropshadow}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Size={scale(dropshadowSize.X, dropshadowSize.Y)}
					Position={scale(dropshadowPosition.X, dropshadowPosition.Y)}
					BackgroundTransparency={1}
				/>

				{/* Art with parallax */}
				<ParallaxImage
					image={backgroundImage}
					imageSize={backgroundImageSize}
					padding={new Vector2(50, 50)}
					offset={offset}
				>
					<uicorner CornerRadius={new UDim(0, 16)} />
				</ParallaxImage>

				{/* Content */}
				<Canvas clipsDescendants>{children}</Canvas>

				{/* Shine */}
				<Fill
					radius={16}
					color={hex("#ffffff")}
					transparency={useSpring(isHovered ? 0 : 1, shineSpringOptions)}
				>
					<uigradient
						Transparency={new NumberSequence(0.75, 1)}
						Offset={useSpring(isHovered ? new Vector2(0, 0) : new Vector2(-1, -1), shineSpringOptions)}
						Rotation={45}
					/>
				</Fill>
				<Border
					radius={18}
					size={3}
					color={hex("#ffffff")}
					transparency={useSpring(isHovered ? 0 : 1, shineSpringOptions)}
				>
					<uigradient
						Transparency={new NumberSequence(0.7, 0.9)}
						Offset={useSpring(isHovered ? new Vector2(0, 0) : new Vector2(-1, -1), shineSpringOptions)}
						Rotation={45}
					/>
				</Border>

				{/* Border */}
				<Border color={hex("#ffffff")} radius={16} transparency={useSpring(isHovered ? 1 : 0.8, {})} />
			</Canvas>

			{/* Input capture */}
			<textbutton
				Event={{
					Activated: () => onActivate(),
					MouseEnter: () => setButtonState({ isHovered: true }),
					MouseLeave: () => setButtonState({ isHovered: false, isPressed: false }),
					MouseButton1Down: () => setButtonState({ isPressed: true }),
					MouseButton1Up: () => setButtonState({ isPressed: false }),
				}}
				Size={scale(1, 1)}
				Text=""
				Transparency={1}
			/>
		</Canvas>
	);
}

export default hooked(ScriptCard);
