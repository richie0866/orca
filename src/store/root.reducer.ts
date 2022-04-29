import Rodux from "@rbxts/rodux";

import { PagesAction, PagesState, pagesReducer } from "./pages";
import { ProfileAction, ProfileState, profileReducer } from "./profile";
import { SettingsAction, SettingsState, settingsReducer } from "./settings";
import { ShortcutsAction, ShortcutsState, shortcutsReducer } from "./shortcuts";
import { ThemesAction, ThemesState, themesReducer } from "./themes";

export interface RootState {
	pages: PagesState;
	settings: SettingsState;
	shortcuts: ShortcutsState;
	themes: ThemesState;
	profile: ProfileState;
}

export type RootAction = PagesAction | SettingsAction | ShortcutsAction | ThemesAction | ProfileAction;

export type RootStore = Rodux.Store<RootState, RootAction>;

export const rootReducer = Rodux.combineReducers<RootState, RootAction>({
	pages: pagesReducer,
	settings: settingsReducer,
	shortcuts: shortcutsReducer,
	themes: themesReducer,
	profile: profileReducer,
});
