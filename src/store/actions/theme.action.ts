import Rodux from "@rbxts/rodux";
import { Theme } from "themes/theme.interface";

export type ThemeAction = Rodux.InferActionFromCreator<typeof setTheme>;

export const setTheme = Rodux.makeActionCreator("theme/setTheme", (theme: Theme) => ({ theme }));
