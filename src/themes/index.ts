import { darkTheme } from "themes/dark-theme";
import { frostedGlass } from "themes/frosted-glass";
import { highContrast } from "themes/high-contrast";
import { lightTheme } from "themes/light-theme";
import { obsidian } from "themes/obsidian";
import { sorbet } from "themes/sorbet";
import { Theme } from "themes/theme.interface";

const themes: Theme[] = [sorbet, darkTheme, lightTheme, frostedGlass, obsidian, highContrast];

export function getThemes() {
	return themes;
}
