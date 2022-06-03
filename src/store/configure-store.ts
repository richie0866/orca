import Rodux from "@rbxts/rodux";
import rootReducer, { RootState } from "reducers";
import { HAS_FILE_ACCESS } from "constants/env";
import { autosave } from "./autosave";

let rootStore: Rodux.Store<RootState, Rodux.Action>;

export function configureStore(): Rodux.Store<RootState, Rodux.Action> {
	return rootStore || (rootStore = createStore());
}

function createStore() {
	if (!HAS_FILE_ACCESS) {
		return new Rodux.Store(rootReducer);
	}

	return new Rodux.Store(rootReducer, {
		settings: autosave("settings", configureStore),
		shortcuts: autosave("shortcuts", configureStore),
		themes: autosave("themes", configureStore),
	});
}
