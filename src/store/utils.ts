import Rodux from "@rbxts/rodux";
import { RootState } from "reducers";
import { configureStore } from "./configure-store";

export function dispatchAction(action: Rodux.Action) {
	return configureStore().dispatch(action);
}

export function selectStore<T>(selector: (state: RootState) => T): T;
export function selectStore(): RootState;
export function selectStore(selector?: (state: RootState) => unknown): unknown {
	const store = configureStore();
	return selector ? selector(store.getState()) : store.getState();
}

export function storeChanged<T>(selector: (state: RootState) => T, callback: (state: T) => void) {
	const store = configureStore();

	let lastState = selector(store.getState());
	task.defer(callback, lastState);

	return store.changed.connect((state) => {
		const newState = selector(state);

		if (lastState !== newState) {
			task.spawn(callback, (lastState = newState));
		}
	});
}
