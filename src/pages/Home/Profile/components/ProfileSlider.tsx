import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure, useMemo } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import Button from "components/Button";
import Slider from "components/Slider";
import { DropshadowBlur } from "components/Dropshadow";
import { Page } from "store/pages";
import { ProfileState, toggleProfileSlider, updateProfileSlider } from "store/profile";
import { useRootDispatch, useRootSelector, useRootStore } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

const SLIDER_WIDTH = 188;
const SLIDER_HEIGHT = 50;

const SWITCH_WIDTH = 80;
const SWITCH_HEIGHT = 50;
const SWITCH_PADDING = 14;

interface Props extends Roact.PropsWithChildren {
	index: number;
	key: keyof ProfileState["sliders"];
	text: string;
	units: string;
	min: number;
	max: number;
	position: UDim2;
}

function ProfileSlider({ index, key, text, units, min, max, position, [Roact.Children]: children }: Props) {
	const store = useRootStore();
	const dispatch = useRootDispatch();

	const [sliderStyle, buttonStyle] = useTheme((theme) => [theme.profile.sliders[key], theme.profile.switches[key]]);
	const enabled = useRootSelector((state) => state.profile.sliders[key].enabled);
	const visible = useRootSelector((state) => state.pages.visible && state.pages.currentPage === Page.Home);

	const [visibility, setGoal] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setGoal(new Spring(visible ? 1 : 0, { frequency: 5 }));
		},
		visible ? 200 + index * 50 : 200,
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
				onClick={() => dispatch(toggleProfileSlider(key, !enabled))}
				active={enabled}
				style={buttonStyle}
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

				{children}
			</Button.Root>

			<Slider.Root
				onChange={(value) => dispatch(updateProfileSlider(key, value))}
				min={min}
				max={max}
				defaultValue={useMemo(() => store.getState().profile.sliders[key].value, [])}
				style={sliderStyle}
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
