import Rodux from "@rbxts/rodux";
import { ProfileState } from "./profile.model";

export function updateProfileSlider(
	key: keyof ProfileState["sliders"],
	value: number,
): Rodux.Action<"UPDATE_PROFILE_SLIDER"> & {
	payload: { key: keyof ProfileState["sliders"]; value: number };
} {
	return {
		type: "UPDATE_PROFILE_SLIDER",
		payload: { key, value },
	};
}

export function toggleProfileSlider(
	key: keyof ProfileState["sliders"],
	enabled: boolean,
): Rodux.Action<"TOGGLE_PROFILE_SLIDER"> & { payload: { key: keyof ProfileState["sliders"]; enabled: boolean } } {
	return {
		type: "TOGGLE_PROFILE_SLIDER",
		payload: { key, enabled },
	};
}

export function toggleProfileSwitch(
	key: keyof ProfileState["switches"],
	enabled: boolean,
): Rodux.Action<"TOGGLE_PROFILE_SWITCH"> & { payload: { key: keyof ProfileState["switches"]; enabled: boolean } } {
	return {
		type: "TOGGLE_PROFILE_SWITCH",
		payload: { key, enabled },
	};
}

export type ProfileAction =
	| ReturnType<typeof updateProfileSlider>
	| ReturnType<typeof toggleProfileSlider>
	| ReturnType<typeof toggleProfileSwitch>;
