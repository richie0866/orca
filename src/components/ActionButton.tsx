import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
import BrightButton from "components/BrightButton";
import { useAppDispatch, useAppSelector } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { clearHint, setHint } from "store/actions/dashboard.action";
import { setJobActive } from "store/actions/jobs.action";
import { JobsState } from "store/models/jobs.model";
import { Theme } from "themes/theme.interface";
import { px } from "utils/udim2";

interface Props {
	action: keyof JobsState;
	hint: string;
	theme: Theme["home"]["profile"] | Theme["apps"]["players"];
	image: string;
	position: UDim2;
	canDeactivate?: boolean;
}

function ActionButton({ action, hint, theme, image, position, canDeactivate }: Props) {
	const dispatch = useAppDispatch();
	const active = useAppSelector((state) => state.jobs[action].active);

	const [hovered, setHovered] = useState(false);

	const accent = action in theme.highlight ? theme.highlight[action as never] : theme.background;
	if (!(action in theme.highlight)) {
		warn(`ActionButton: ${action} is not in theme.highlight`);
	}

	const background = useSpring(
		active
			? accent
			: hovered
			? theme.button.backgroundHovered ?? theme.button.background.Lerp(accent, 0.1)
			: theme.button.background,
		{},
	);
	const foreground = useSpring(
		active && theme.button.foregroundAccent ? theme.button.foregroundAccent : theme.button.foreground,
		{},
	);

	return (
		<BrightButton
			onActivate={() => {
				if (active && canDeactivate) {
					dispatch(setJobActive(action, false));
				} else if (!active) {
					dispatch(setJobActive(action, true));
				}
			}}
			onHover={(hovered) => {
				if (hovered) {
					setHovered(true);
					dispatch(setHint(hint));
				} else {
					setHovered(false);
					dispatch(clearHint());
				}
			}}
			size={px(61, 49)}
			position={position}
			radius={8}
			color={background}
			borderEnabled={theme.button.outlined}
			borderColor={foreground}
			transparency={theme.button.backgroundTransparency}
		>
			<imagelabel
				Image={image}
				ImageColor3={foreground}
				ImageTransparency={useSpring(
					active
						? 0
						: hovered
						? theme.button.foregroundTransparency - 0.25
						: theme.button.foregroundTransparency,
					{},
				)}
				Size={px(36, 36)}
				Position={px(12, 6)}
				BackgroundTransparency={1}
			/>
		</BrightButton>
	);
}

export default hooked(ActionButton);
