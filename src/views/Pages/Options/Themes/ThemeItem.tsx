import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import { useAppDispatch, useAppSelector } from "hooks/common/rodux-hooks";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { useTheme } from "hooks/use-theme";
import { setTheme } from "store/actions/options.action";
import { DashboardPage } from "store/models/dashboard.model";
import { Theme } from "themes/theme.interface";
import { getLuminance, hex } from "utils/color3";
import { lerp } from "utils/number-util";
import { px, scale } from "utils/udim2";

export const PADDING = 20;
export const ENTRY_HEIGHT = 60;
export const ENTRY_WIDTH = 326 - 24 * 2;
export const ENTRY_TEXT_PADDING = 16;

interface Props {
	theme: Theme;
	index: number;
}

function ThemeItem({ theme, index }: Props) {
	const dispatch = useAppDispatch();
	const buttonTheme = useTheme("options").themes.themeButton;
	const isOpen = useIsPageOpen(DashboardPage.Options);
	const isVisible = useDelayedUpdate(isOpen, isOpen ? 300 + index * 40 : 280);

	const isSelected = useAppSelector((state) => state.options.currentTheme === theme.name);
	const [hovered, setHovered] = useState(false);

	const background = useSpring(
		isSelected
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.background.Lerp(buttonTheme.accent, 0.1)
			: buttonTheme.background,
		{},
	);
	const dropshadow = useSpring(
		isSelected
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.dropshadow.Lerp(buttonTheme.accent, 0.5)
			: buttonTheme.dropshadow,
		{},
	);
	const foreground = useSpring(
		isSelected && buttonTheme.foregroundAccent ? buttonTheme.foregroundAccent : buttonTheme.foreground,
		{},
	);

	return (
		<Canvas
			size={px(ENTRY_WIDTH, ENTRY_HEIGHT)}
			position={useSpring(
				isVisible
					? px(0, (PADDING + ENTRY_HEIGHT) * index)
					: px(-ENTRY_WIDTH - 24, (PADDING + ENTRY_HEIGHT) * index),
				{},
			)}
			zIndex={index}
		>
			{/* Underglow */}
			<Glow
				radius={GlowRadius.Size70}
				color={dropshadow}
				size={new UDim2(1, 36, 1, 36)}
				position={px(-18, 5 - 18)}
				transparency={useSpring(
					isSelected
						? buttonTheme.glowTransparency
						: hovered
						? lerp(buttonTheme.dropshadowTransparency, buttonTheme.glowTransparency, 0.5)
						: buttonTheme.dropshadowTransparency,
					{},
				)}
			/>

			{/* Body */}
			<Fill color={background} transparency={buttonTheme.backgroundTransparency} radius={8} />

			{/* Name */}
			<textlabel
				Text={theme.name}
				Font="GothamBold"
				TextSize={16}
				TextColor3={foreground}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Center}
				TextTransparency={useSpring(
					isSelected
						? 0
						: hovered
						? buttonTheme.foregroundTransparency / 2
						: buttonTheme.foregroundTransparency,
					{},
				)}
				BackgroundTransparency={1}
				Position={px(ENTRY_TEXT_PADDING, 1)}
				Size={new UDim2(1, -ENTRY_TEXT_PADDING, 1, -1)}
				ClipsDescendants
			/>

			{/* Preview */}
			<ThemePreview color={background} previewTheme={theme.preview} />

			{/* Border */}
			{buttonTheme.outlined && <Border color={foreground} transparency={0.8} radius={8} />}

			{/* Input capture */}
			<textbutton
				Event={{
					Activated: () => !isSelected && dispatch(setTheme(theme.name)),
					MouseEnter: () => setHovered(true),
					MouseLeave: () => setHovered(false),
				}}
				Text=""
				Transparency={1}
				Size={scale(1, 1)}
			/>
		</Canvas>
	);
}

export default hooked(ThemeItem);

interface ThemePreviewProps {
	color: Roact.Binding<Color3>;
	previewTheme: Theme["preview"];
}

function ThemePreview({ color, previewTheme }: ThemePreviewProps) {
	return (
		<frame
			AnchorPoint={new Vector2(1, 0)}
			Size={new UDim2(0, 114, 1, -4)}
			Position={new UDim2(1, -2, 0, 2)}
			BackgroundColor3={color}
			Transparency={1}
			BorderSizePixel={0}
		>
			<uicorner CornerRadius={new UDim(0, 6)} />

			{/* Foreground */}
			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				Size={px(25, 25)}
				Position={new UDim2(0, 12, 0.5, 0)}
				BackgroundColor3={hex("#ffffff")}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uigradient
					Color={previewTheme.foreground.color}
					Transparency={previewTheme.foreground.transparency}
					Rotation={previewTheme.foreground.rotation}
				/>
				<uistroke
					Color={getLuminance(previewTheme.foreground.color) > 0.5 ? hex("#000000") : hex("#ffffff")}
					Transparency={0.5}
					Thickness={2}
				/>
			</frame>

			{/* Background */}
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={px(25, 25)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				BackgroundColor3={hex("#ffffff")}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uigradient
					Color={previewTheme.background.color}
					Transparency={previewTheme.background.transparency}
					Rotation={previewTheme.background.rotation}
				/>
				<uistroke
					Color={getLuminance(previewTheme.background.color) > 0.5 ? hex("#000000") : hex("#ffffff")}
					Transparency={0.5}
					Thickness={2}
				/>
			</frame>

			{/* Accent */}
			<frame
				AnchorPoint={new Vector2(1, 0.5)}
				Size={px(25, 25)}
				Position={new UDim2(1, -12, 0.5, 0)}
				BackgroundColor3={hex("#ffffff")}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<uigradient
					Color={previewTheme.accent.color}
					Transparency={previewTheme.accent.transparency}
					Rotation={previewTheme.accent.rotation}
				/>
				<uistroke
					Color={getLuminance(previewTheme.accent.color) > 0.5 ? hex("#000000") : hex("#ffffff")}
					Transparency={0.5}
					Thickness={2}
				/>
			</frame>
		</frame>
	);
}
