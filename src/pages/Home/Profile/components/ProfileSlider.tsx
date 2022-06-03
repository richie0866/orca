import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure, useMemo } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import Button from "components/Button";
import Slider from "components/Slider";
import Tooltip from "components/Tooltip";
import { DropshadowBlur } from "components/Dropshadow";
import { ProfileState, selectSliderEnabled, toggleProfileSlider, updateProfileSlider } from "reducers/profile";
import { usePageOpen } from "hooks/use-page-open";
import { useRootDispatch, useRootSelector, useRootStore } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

const SLIDER_WIDTH = 188;
const SLIDER_HEIGHT = 50;

const SWITCH_WIDTH = 80;
const SWITCH_HEIGHT = 50;
const SWITCH_PADDING = 14;

interface Props extends Roact.PropsWithChildren {
	order: number;
	name: keyof ProfileState["sliders"];
	text: string;
	tooltip: string;
	tooltipAlignment?: "left" | "right" | "center";
	units: string;
	min: number;
	max: number;
	position: UDim2;
}

function ProfileSlider({
	order,
	name,
	text,
	tooltip,
	tooltipAlignment,
	units,
	min,
	max,
	position,
	[Roact.Children]: children,
}: Props) {
	const store = useRootStore();
	const dispatch = useRootDispatch();

	const visible = usePageOpen("Home");
	const styles = useTheme((theme) => theme.profile);
	const enabled = useRootSelector((state) => selectSliderEnabled(state, name));

	const [visibility, setGoal] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setGoal(new Spring(visible ? 1 : 0, { frequency: 5 }));
		},
		visible ? 200 + order * 50 : 200,
		[visible],
	);

	// Positions for show and hide transitions
	const sliderPosition = position;
	const switchPosition = position.add(new UDim2(0, SLIDER_WIDTH + SWITCH_PADDING, 0, 0));
	const sliderPositionHidden = new UDim2(new UDim(0, -SLIDER_WIDTH), position.Y);
	const switchPositionHidden = new UDim2(new UDim(1, SLIDER_WIDTH + SWITCH_PADDING), position.Y);

	return (
		<>
			<Button.Root
				onClick={() => dispatch(toggleProfileSlider(name, !enabled))}
				active={enabled}
				style={styles.switches[name]}
				size={new UDim2(0, SWITCH_WIDTH, 0, SWITCH_HEIGHT)}
				position={visibility.map((n) => switchPositionHidden.Lerp(switchPosition, n))}
			>
				<Button.Shadow
					blur={DropshadowBlur.Medium}
					scale={0.75}
					size={new UDim2(1, 32, 1, 30)}
					position={new UDim2(0.5, 0, 1, 20)}
				/>
				<Button.Body />
				<Button.Text text={text} textSize={15} textFont="GothamBold" position={new UDim2(0.5, 0, 0.5, 1)} />

				<Tooltip caption={tooltip} style={styles.switches[name]} alignment={tooltipAlignment} />

				{children}
			</Button.Root>

			<Slider.Root
				onChange={(value) => dispatch(updateProfileSlider(name, value))}
				min={min}
				max={max}
				defaultValue={useMemo(() => store.getState().profile.sliders[name].value, [])}
				style={styles.sliders[name]}
				size={new UDim2(0, SLIDER_WIDTH, 0, SLIDER_HEIGHT)}
				position={visibility.map((n) => sliderPositionHidden.Lerp(sliderPosition, n))}
			>
				<Slider.Shadow
					blur={DropshadowBlur.Medium}
					scale={0.75}
					size={new UDim2(1, 32, 1, 30)}
					position={new UDim2(0.5, 0, 1, 20)}
				/>
				<Slider.Glow
					blur={DropshadowBlur.Medium}
					scale={0.75}
					size={new UDim2(1, 32, 1, 30)}
					position={new UDim2(0.5, 0, 1, 20)}
				/>
				<Slider.Body />

				<Slider.Text
					parseText={(value) => `${math.round(value)} ${units}`}
					textSize={15}
					textFont="GothamBold"
					position={new UDim2(0.5, 0, 0.5, 1)}
				/>
			</Slider.Root>
		</>
	);
}

export default pure(ProfileSlider);
