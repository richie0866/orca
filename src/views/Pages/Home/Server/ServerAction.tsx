import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
import BrightButton from "components/BrightButton";
import { useAppDispatch, useAppSelector } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { useTheme } from "hooks/use-theme";
import { clearHint, setHint } from "store/actions/dashboard.action";
import { setJobActive } from "store/actions/jobs.action";
import { JobsState } from "store/models/jobs.model";
import { px, scale } from "utils/udim2";

interface Props {
	action: keyof JobsState;
	hint: string;
	icon: string;
	size: UDim2;
	position: UDim2;
}

function ServerAction({ action, hint, icon, size, position }: Props) {
	const dispatch = useAppDispatch();
	const theme = useTheme("home").server[action === "switchServer" ? "switchButton" : "rejoinButton"];
	const active = useAppSelector((state) => state.jobs[action].active);

	const [hovered, setHovered] = useState(false);

	const background = useSpring(
		active
			? theme.accent
			: hovered
			? theme.backgroundHovered ?? theme.background.Lerp(theme.accent, 0.1)
			: theme.background,
		{},
	);
	const foreground = useSpring(active && theme.foregroundAccent ? theme.foregroundAccent : theme.foreground, {});

	return (
		<BrightButton
			onActivate={() => dispatch(setJobActive(action, !active))}
			onHover={(hovered) => {
				if (hovered) {
					setHovered(true);
					dispatch(setHint(hint));
				} else {
					setHovered(false);
					dispatch(clearHint());
				}
			}}
			size={size}
			position={position}
			radius={8}
			color={background}
			borderEnabled={theme.outlined}
			borderColor={foreground}
			transparency={theme.backgroundTransparency}
		>
			<imagelabel
				Image={icon}
				ImageColor3={foreground}
				ImageTransparency={useSpring(
					active ? 0 : hovered ? theme.foregroundTransparency - 0.25 : theme.foregroundTransparency,
					{},
				)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={px(36, 36)}
				Position={scale(0.5, 0.5)}
				BackgroundTransparency={1}
			/>
		</BrightButton>
	);
}

export default hooked(ServerAction);
