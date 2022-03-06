import Rodux from "@rbxts/rodux";

export type OptionsAction = Rodux.InferActionFromCreator<typeof setAcrylicBlurEnabled>;

export const setAcrylicBlurEnabled = Rodux.makeActionCreator("options/setAcrylicBlurEnabled", (active: boolean) => ({
	active,
}));
