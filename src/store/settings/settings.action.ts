import Rodux from "@rbxts/rodux";

export function setBackgroundBlur(enabled: true): Rodux.Action<"SET_BACKGROUND_BLUR"> & { payload: boolean } {
	return {
		type: "SET_BACKGROUND_BLUR",
		payload: enabled,
	};
}

export type SettingsAction = ReturnType<typeof setBackgroundBlur>;
