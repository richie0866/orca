import { useAppSelector } from "hooks/common/rodux-hooks";
import { Theme } from "themes/theme.interface";

export function useTheme<K extends keyof Theme>(key: K): Theme[K] {
	return useAppSelector((state) => state.theme.current[key]);
}
