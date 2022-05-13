import { ProfileState } from "./model";
import { RootState } from "reducers";

export const selectSliderStatus = (state: RootState, key: keyof ProfileState["sliders"]) =>
	state.profile.sliders[key].enabled;

export const selectSwitchStatus = (state: RootState, key: keyof ProfileState["switches"]) =>
	state.profile.switches[key].enabled;
