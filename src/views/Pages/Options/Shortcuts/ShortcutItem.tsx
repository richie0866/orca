import Roact from "@rbxts/roact";
import { pure, useEffect, useState } from "@rbxts/roact-hooked";
import { UserInputService } from "@rbxts/services";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import { useAppDispatch, useAppSelector } from "hooks/common/rodux-hooks";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { useTheme } from "hooks/use-theme";
import { removeShortcut, setShortcut } from "store/actions/options.action";
import { DashboardPage } from "store/models/dashboard.model";
import { lerp } from "utils/number-util";
import { px, scale } from "utils/udim2";

export const PADDING = 20;
export const ENTRY_HEIGHT = 60;
export const ENTRY_WIDTH = 326 - 24 * 2;
export const ENTRY_TEXT_PADDING = 16;

interface Props {
	onActivate: () => void;
	onSelect: (action?: string) => void;
	selectedItem?: string;
	action: string;
	description: string;
	index: number;
}

/**
 * A single shortcut entry. Handles setting and activating the shortcut.
 */
function ShortcutItem({ onActivate, onSelect, selectedItem, action, description, index }: Props) {
	const dispatch = useAppDispatch();
	const buttonTheme = useTheme("options").shortcuts.shortcutButton;
	const isOpen = useIsPageOpen(DashboardPage.Options);
	const isVisible = useDelayedUpdate(isOpen, isOpen ? 250 + index * 40 : 230);

	const shortcut = useAppSelector((state) => state.options.shortcuts[action]);
	const shortcutEnum = Enum.KeyCode.GetEnumItems().find((item) => item.Value === shortcut);

	const selected = selectedItem === action;
	const [hovered, setHovered] = useState(false);

	// On shortcut activated
	useEffect(() => {
		if (selectedItem !== undefined) {
			return;
		}
		const handle = UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (!gameProcessed && input.KeyCode.Value === shortcut) {
				onActivate();
			}
		});
		return () => {
			handle.Disconnect();
		};
	}, [selectedItem, shortcut]);

	// On shortcut changed
	useEffect(() => {
		if (!selected) {
			return;
		}
		const handle = UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) {
				return;
			}
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				onSelect(undefined);
				return;
			}
			switch (input.KeyCode) {
				case Enum.KeyCode.Unknown:
					break;
				case Enum.KeyCode.Escape:
					dispatch(removeShortcut(action));
					onSelect(undefined);
					break;
				case Enum.KeyCode.Backspace:
					dispatch(removeShortcut(action));
					onSelect(undefined);
					break;
				case Enum.KeyCode.Return:
					onSelect(undefined);
					break;
				default:
					dispatch(setShortcut(action, input.KeyCode.Value));
					onSelect(undefined);
					break;
			}
		});
		return () => {
			handle.Disconnect();
		};
	}, [selected]);

	const background = useSpring(
		selected
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.background.Lerp(buttonTheme.accent, 0.1)
			: buttonTheme.background,
		{},
	);
	const dropshadow = useSpring(
		selected
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.dropshadow.Lerp(buttonTheme.accent, 0.5)
			: buttonTheme.dropshadow,
		{},
	);
	const foreground = useSpring(
		selected && buttonTheme.foregroundAccent ? buttonTheme.foregroundAccent : buttonTheme.foreground,
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
					selected
						? buttonTheme.glowTransparency
						: hovered
						? lerp(buttonTheme.dropshadowTransparency, buttonTheme.glowTransparency, 0.5)
						: buttonTheme.dropshadowTransparency,
					{},
				)}
			/>

			{/* Body */}
			<Fill color={background} transparency={buttonTheme.backgroundTransparency} radius={8} />

			{/* Description */}
			<textlabel
				Text={description}
				Font="GothamBold"
				TextSize={16}
				TextColor3={foreground}
				TextXAlignment="Left"
				TextYAlignment="Center"
				TextTransparency={useSpring(
					selected
						? 0
						: hovered
						? buttonTheme.foregroundTransparency / 2
						: buttonTheme.foregroundTransparency,
					{},
				)}
				Position={px(ENTRY_TEXT_PADDING, 1)}
				Size={new UDim2(1, -ENTRY_TEXT_PADDING, 1, -1)}
				BackgroundTransparency={1}
				ClipsDescendants
			/>

			{/* Shortcut */}
			<textlabel
				Text={shortcutEnum ? shortcutEnum.Name : "Not bound"}
				Font="GothamBold"
				TextSize={16}
				TextColor3={foreground}
				TextXAlignment="Center"
				TextYAlignment="Center"
				TextTransparency={useSpring(
					selected
						? 0
						: hovered
						? buttonTheme.foregroundTransparency / 2
						: buttonTheme.foregroundTransparency,
					{},
				)}
				TextTruncate="AtEnd"
				AnchorPoint={new Vector2(1, 0)}
				Position={new UDim2(1, 0, 0, 1)}
				Size={new UDim2(0, 124, 1, -1)}
				BackgroundTransparency={1}
				ClipsDescendants
			/>
			<frame
				Size={buttonTheme.outlined ? new UDim2(0, 1, 1, -2) : new UDim2(0, 1, 1, -36)}
				Position={buttonTheme.outlined ? new UDim2(1, -124, 0, 1) : new UDim2(1, -124, 0, 18)}
				BackgroundColor3={foreground}
				BackgroundTransparency={0.8}
				BorderSizePixel={0}
			/>

			{/* Border */}
			{buttonTheme.outlined && <Border color={foreground} transparency={0.8} radius={8} />}

			{/* Input capture */}
			<textbutton
				Event={{
					Activated: () => onSelect(action),
					MouseEnter: () => setHovered(true),
					MouseLeave: () => setHovered(false),
				}}
				Text=""
				Size={scale(1, 1)}
				Transparency={1}
			/>
		</Canvas>
	);
}

export default pure(ShortcutItem);
