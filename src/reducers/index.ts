import Rodux from "@rbxts/rodux";
import gamesReducer, { GamesState } from "./games";
import pagesReducer, { PagesState } from "./pages";
import profileReducer, { ProfileState } from "./profile";
import settingsReducer, { SettingsState } from "./settings";
import shortcutsReducer, { ShortcutsState } from "./shortcuts";
import themesReducer, { ThemesState } from "./themes";

export interface RootState {
	games: GamesState;
	pages: PagesState;
	settings: SettingsState;
	shortcuts: ShortcutsState;
	themes: ThemesState;
	profile: ProfileState;
}

export default Rodux.combineReducers<RootState, Rodux.Action>({
	games: gamesReducer,
	pages: pagesReducer,
	settings: settingsReducer,
	shortcuts: shortcutsReducer,
	themes: themesReducer,
	profile: profileReducer,
});
