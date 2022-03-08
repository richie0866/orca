import Roact from "@rbxts/roact";
import { pure, useState } from "@rbxts/roact-hooked";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import { useAppDispatch, useAppSelector } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { useTheme } from "hooks/use-theme";
import { clearHint, setHint } from "store/actions/dashboard.action";
import { setConfig } from "store/actions/options.action";
import { OptionsState } from "store/models/options.model";
import { lerp } from "utils/number-util";
import { px, scale } from "utils/udim2";

export const PADDING = 20;
export const ENTRY_HEIGHT = 60;
export const ENTRY_WIDTH = 326 - 24 * 2;
export const ENTRY_TEXT_PADDING = 16;

interface Props {
	action: keyof OptionsState["config"];
	description: string;
	hint: string;
	index: number;
}

function ConfigItem({ action, description, hint, index }: Props) {
	const dispatch = useAppDispatch();
	const buttonTheme = useTheme("options").config.configButton;

	const active = useAppSelector((state) => state.options.config[action]);
	const [hovered, setHovered] = useState(false);

	const background = useSpring(
		active
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.background.Lerp(buttonTheme.accent, 0.1)
			: buttonTheme.background,
		{},
	);
	const dropshadow = useSpring(
		active
			? buttonTheme.accent
			: hovered
			? buttonTheme.backgroundHovered ?? buttonTheme.dropshadow.Lerp(buttonTheme.accent, 0.5)
			: buttonTheme.dropshadow,
		{},
	);
	const foreground = useSpring(
		active && buttonTheme.foregroundAccent ? buttonTheme.foregroundAccent : buttonTheme.foreground,
		{},
	);

	return (
		<Canvas size={px(ENTRY_WIDTH, ENTRY_HEIGHT)} position={px(0, (PADDING + ENTRY_HEIGHT) * index)} zIndex={index}>
			{/* Underglow */}
			<Glow
				radius={GlowRadius.Size70}
				color={dropshadow}
				size={new UDim2(1, 36, 1, 36)}
				position={px(-18, 5 - 18)}
				transparency={useSpring(
					active
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
					active ? 0 : hovered ? buttonTheme.foregroundTransparency / 2 : buttonTheme.foregroundTransparency,
					{},
				)}
				Position={px(ENTRY_TEXT_PADDING, 1)}
				Size={new UDim2(1, -ENTRY_TEXT_PADDING, 1, -1)}
				BackgroundTransparency={1}
				ClipsDescendants
			/>

			{/* Border */}
			{buttonTheme.outlined && <Border color={foreground} transparency={0.8} radius={8} />}

			{/* Input capture */}
			<textbutton
				Event={{
					Activated: () => dispatch(setConfig(action, !active)),
					MouseEnter: () => {
						setHovered(true);
						dispatch(setHint(hint));
					},
					MouseLeave: () => {
						setHovered(false);
						dispatch(clearHint());
					},
				}}
				Text=""
				Size={scale(1, 1)}
				Transparency={1}
			/>
		</Canvas>
	);
}

export default pure(ConfigItem);
