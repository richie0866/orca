import Rodux from "@rbxts/rodux";

import { IS_DEV } from "constants";
import { RootAction, RootState, rootReducer } from "./root.reducer";
import { persistentData } from "./utils/data-persistence";

export type RootStore = Rodux.Store<RootState, RootAction>;

const rootStoreProvider = {
	current: identity<RootStore | undefined>(undefined),
};

export function configureStore(): RootStore {
	if (rootStoreProvider.current) {
		return rootStoreProvider.current;
	}

	const initialState: Partial<RootState> = IS_DEV
		? {}
		: {
				settings: persistentData("settings", rootSelector),
				shortcuts: persistentData("shortcuts", rootSelector),
				themes: persistentData("themes", rootSelector),
		  };

	return new Rodux.Store(rootReducer, initialState);
}

// Alias for configureStore, mostly for semantics
export function getStore(): RootStore {
	return configureStore();
}

export function rootDispatch(action: RootAction): void {
	getStore().dispatch(action);
}

export function rootSelector<T = RootState>(selector?: (state: RootState) => T): T {
	const rootStore = getStore();
	return selector ? selector(rootStore.getState()) : (rootStore.getState() as unknown as T);
}

export function rootChanged<T>(selector: (state: RootState) => T, callback: (value: T) => void): Rodux.Signal {
	let lastState: T;

	return getStore().changed.connect((state) => {
		const newState = selector(state);

		if (lastState !== newState) {
			lastState = newState;
			callback(newState);
		}
	});
}
