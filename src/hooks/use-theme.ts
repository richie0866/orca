import { useAppSelector } from "hooks/common/rodux-hooks";
import { getThemes } from "themes";
import { darkTheme } from "themes/dark-theme";
import { Theme } from "themes/theme.interface";

export function useTheme<K extends keyof Theme>(key: K): Theme[K] {
	return useAppSelector((state) => {
		const theme = getThemes().find((t) => t.name === state.options.currentTheme);
		return theme ? theme[key] : darkTheme[key];
	});
}
