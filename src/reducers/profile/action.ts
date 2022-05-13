import { ProfileState } from "./model";

export function updateProfileSlider(key: keyof ProfileState["sliders"], value: number) {
	return {
		type: "UPDATE_PROFILE_SLIDER",
		key,
		value,
	} as const;
}

export function toggleProfileSlider(key: keyof ProfileState["sliders"], enabled: boolean) {
	return {
		type: "TOGGLE_PROFILE_SLIDER",
		key,
		enabled,
	} as const;
}

export function toggleProfileSwitch(key: keyof ProfileState["switches"], enabled: boolean) {
	return {
		type: "TOGGLE_PROFILE_SWITCH",
		key,
		enabled,
	} as const;
}

export type ProfileAction =
	| ReturnType<typeof updateProfileSlider>
	| ReturnType<typeof toggleProfileSlider>
	| ReturnType<typeof toggleProfileSwitch>;
