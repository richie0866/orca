import { darkTheme } from "./dark-theme";

const themes = [darkTheme];

export function getThemes() {
	return themes;
}

export function getTheme(themeName: string) {
	return themes.find((theme) => theme.name === themeName);
}
