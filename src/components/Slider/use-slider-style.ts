import Roact from "@rbxts/roact";
import { useContext } from "@rbxts/roact-hooked";

import { SliderStyle } from "reducers/themes";

export const SliderStyleContext = Roact.createContext<{
	style: SliderStyle;
	min: number;
	max: number;
	percent: Roact.Binding<number>;
}>(undefined!);

export function useSliderStyle() {
	return useContext(SliderStyleContext);
}
