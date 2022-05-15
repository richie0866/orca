import { useMemo } from "@rbxts/roact-hooked";

import { Theme, selectThemeData } from "reducers/themes";
import { useRootSelector } from "./use-root-store";

export function useTheme<T>(selector: (theme: Theme) => T): T;
export function useTheme(): Theme;
export function useTheme(selector?: (theme: Theme) => defined): defined {
	const theme = useRootSelector(selectThemeData);
	const result = useMemo(() => selector?.(theme) ?? theme, [theme, selector]);
	return result;
}
