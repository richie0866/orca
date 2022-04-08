import Rodux from "@rbxts/rodux";

export function setCurrentTheme(theme: string): Rodux.Action<"SET_CURRENT_THEME"> & { payload: string } {
	return {
		type: "SET_CURRENT_THEME",
		payload: theme,
	};
}

export type ThemesAction = ReturnType<typeof setCurrentTheme>;
