import Rodux from "@rbxts/rodux";

import { IS_DEV } from "constants";
import { RootAction, RootState, rootReducer } from "./root.reducer";
import { persistentData } from "./utils/data-persistence";

export type RootStore = Rodux.Store<RootState, RootAction>;

let rootStore: RootStore | undefined;

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
	configureStore().dispatch(action);
}

export function rootSelector<T = RootState>(selector?: (state: RootState) => T): T {
	const rootStore = configureStore();
	return selector ? selector(rootStore.getState()) : (rootStore.getState() as unknown as T);
}

export function rootChanged<T>(selector: (state: RootState) => T, callback: (value: T) => void): Rodux.Signal {
	let lastState: T;

	return configureStore().changed.connect((state) => {
		const newState = selector(state);

		if (lastState !== newState) {
			lastState = newState;
			callback(newState);
		}
	});
}
