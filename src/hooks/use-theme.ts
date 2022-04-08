import { useMemo } from "@rbxts/roact-hooked";

import { Theme, getTheme } from "store/themes";
import { useRootSelector } from "./use-root-store";

const defaultTheme = getTheme("Dark theme")!;

export function useTheme<T>(selector: (theme: Theme) => T): T;
export function useTheme(): Theme;
export function useTheme(selector?: (theme: Theme) => unknown): unknown {
	const themeName = useRootSelector((state) => state.themes.currentTheme);
	const theme = useMemo(() => getTheme(themeName) || defaultTheme, [themeName]);

	if (selector) {
		return selector(theme);
	}

	return theme;
}
