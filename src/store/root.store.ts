import Rodux from "@rbxts/rodux";

import { IS_DEV } from "constants";
import { RootAction, RootState, RootStore, rootReducer } from "./root.reducer";
import { persistentData } from "./utils/data-persistence";

let rootStore: RootStore;

function createStore(): RootStore {
	if (IS_DEV) {
		return new Rodux.Store(rootReducer);
	}

	return new Rodux.Store(rootReducer, {
		settings: persistentData("settings", rootSelector),
		shortcuts: persistentData("shortcuts", rootSelector),
		themes: persistentData("themes", rootSelector),
	});
}

export function configureStore(): RootStore {
	if (rootStore) {
		return rootStore;
	}
	return (rootStore = createStore());
}

export function rootDispatch(action: RootAction): void {
	configureStore();
	rootStore.dispatch(action);
}

export function rootSelector<T>(selector: (state: RootState) => T): T;
export function rootSelector(): RootState;
export function rootSelector(selector?: (state: RootState) => unknown) {
	configureStore();
	return selector ? selector(rootStore.getState()) : rootStore.getState();
}

export function rootChanged<T>(selector: (state: RootState) => T, callback: (value: T) => void): Rodux.Signal {
	configureStore();

	let lastState = selector(rootStore.getState());

	task.spawn(callback, lastState);

	return configureStore().changed.connect((state) => {
		const newState = selector(state);

		if (lastState !== newState) {
			callback((lastState = newState));
		}
	});
}
