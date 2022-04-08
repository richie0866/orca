import Rodux from "@rbxts/rodux";

import { PagesAction, PagesState, pagesReducer } from "./pages";
import { SettingsAction, SettingsState, settingsReducer } from "./settings";
import { ShortcutsAction, ShortcutsState, shortcutsReducer } from "./shortcuts";
import { ThemesAction, ThemesState, themesReducer } from "./themes";

export interface RootState {
	pages: PagesState;
	settings: SettingsState;
	shortcuts: ShortcutsState;
	themes: ThemesState;
}

export type RootAction = PagesAction | SettingsAction | ShortcutsAction | ThemesAction;

export const rootReducer = Rodux.combineReducers<RootState, RootAction>({
	pages: pagesReducer,
	settings: settingsReducer,
	shortcuts: shortcutsReducer,
	themes: themesReducer,
});
