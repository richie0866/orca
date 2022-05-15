import { ProfileState } from "./model";
import { RootState } from "reducers";

export const selectSliderEnabled = (state: RootState, key: keyof ProfileState["sliders"]) =>
	state.profile.sliders[key].enabled;

export const selectWalkSpeed = (state: RootState) => selectSliderEnabled(state, "walkspeed");
export const selectJumpHeight = (state: RootState) => selectSliderEnabled(state, "jumpheight");
export const selectFlightSpeed = (state: RootState) => selectSliderEnabled(state, "flightspeed");

export const selectSliderValue = (state: RootState, key: keyof ProfileState["sliders"]) =>
	state.profile.sliders[key].value;

export const selectWalkSpeedValue = (state: RootState) => selectSliderValue(state, "walkspeed");
export const selectJumpHeightValue = (state: RootState) => selectSliderValue(state, "jumpheight");
export const selectFlightSpeedValue = (state: RootState) => selectSliderValue(state, "flightspeed");

export const selectSwitchEnabled = (state: RootState, key: keyof ProfileState["switches"]) =>
	state.profile.switches[key].enabled;

export const selectFreecam = (state: RootState) => selectSwitchEnabled(state, "freecam");
export const selectGhostMode = (state: RootState) => selectSwitchEnabled(state, "ghostmode");
export const selectGodMode = (state: RootState) => selectSwitchEnabled(state, "godmode");
export const selectRespawn = (state: RootState) => selectSwitchEnabled(state, "respawn");
