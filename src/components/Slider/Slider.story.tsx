import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import Slider from "./Slider";
import SliderBody from "./SliderBody";
import SliderGlow from "./SliderGlow";
import SliderShadow from "./SliderShadow";
import SliderText from "./SliderText";
import { DropshadowBlur } from "components/Dropshadow";
import { asColor, getTheme } from "reducers/themes";
import { configureStore } from "store";

const theme = getTheme("Dark theme")!;

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<frame
				BackgroundColor3={asColor(theme.profile.background)}
				Size={new UDim2(0, 500, 0, 500)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
			>
				<Slider
					onChange={(value) => print(`Value: ${value}`)}
					min={10}
					max={100}
					defaultValue={50}
					style={theme.profile.sliders.walkspeed}
					size={new UDim2(0, 200, 0, 50)}
					position={new UDim2(0.5, 0, 0.5, 0)}
					anchorPoint={new Vector2(0.5, 0.5)}
				>
					<SliderShadow
						blur={DropshadowBlur.Medium}
						scale={1}
						size={new UDim2(1, 55, 1, 45)}
						position={new UDim2(0.5, 0, 1, 25)}
					/>
					<SliderGlow
						blur={DropshadowBlur.Medium}
						scale={1}
						size={new UDim2(1, 55, 1, 45)}
						position={new UDim2(0.5, 0, 1, 25)}
					/>
					<SliderBody />
					<SliderText parseText={(value) => `Value: ${math.round(value)}`} />
				</Slider>
			</frame>
		</Provider>,
		target,
		"Clock",
	);

	return () => {
		Roact.unmount(handle);
	};
};
