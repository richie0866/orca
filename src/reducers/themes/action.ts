export function setCurrentTheme(theme: string) {
	return {
		type: "SET_CURRENT_THEME",
		theme,
	} as const;
}

export type ThemesAction = ReturnType<typeof setCurrentTheme>;
