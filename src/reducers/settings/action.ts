export function setBackgroundBlur(enabled: true) {
	return {
		type: "SET_BACKGROUND_BLUR",
		enabled,
	} as const;
}

export type SettingsAction = ReturnType<typeof setBackgroundBlur>;
