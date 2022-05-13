import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";
import { getTheme } from "./styles";

export const selectCurrentTheme = (state: RootState) => state.themes.currentTheme;

export const createThemeSelector = () =>
	createSelector([selectCurrentTheme], (themeName) => getTheme(themeName) || getTheme("Dark theme")!);
