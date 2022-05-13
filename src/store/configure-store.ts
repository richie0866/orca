import Rodux from "@rbxts/rodux";
import rootReducer, { RootState } from "reducers";
import { HAS_FILE_ACCESS } from "constants/env";
import { autosave } from "./autosave";

let rootStore: Rodux.Store<RootState, Rodux.Action>;

export function configureStore() {
	return rootStore || (rootStore = createStore());
}

function createStore() {
	if (!HAS_FILE_ACCESS) {
		return new Rodux.Store(rootReducer);
	}

	return new Rodux.Store(rootReducer, {
		settings: autosave("settings", () => rootStore.getState()),
		shortcuts: autosave("shortcuts", () => rootStore.getState()),
		themes: autosave("themes", () => rootStore.getState()),
	});
}
