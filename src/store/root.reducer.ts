import Rodux from "@rbxts/rodux";

import { GamesAction, GamesState, gamesReducer } from "./games";
import { PagesAction, PagesState, pagesReducer } from "./pages";
import { ProfileAction, ProfileState, profileReducer } from "./profile";
import { SettingsAction, SettingsState, settingsReducer } from "./settings";
import { ShortcutsAction, ShortcutsState, shortcutsReducer } from "./shortcuts";
import { ThemesAction, ThemesState, themesReducer } from "./themes";

export interface RootState {
	games: GamesState;
	pages: PagesState;
	settings: SettingsState;
	shortcuts: ShortcutsState;
	themes: ThemesState;
	profile: ProfileState;
}

export type RootAction = GamesAction | PagesAction | SettingsAction | ShortcutsAction | ThemesAction | ProfileAction;

export type RootStore = Rodux.Store<RootState, RootAction>;

export const rootReducer = Rodux.combineReducers<RootState, RootAction>({
	games: gamesReducer,
	pages: pagesReducer,
	settings: settingsReducer,
	shortcuts: shortcutsReducer,
	themes: themesReducer,
	profile: profileReducer,
});
