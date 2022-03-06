import type { JobsState } from "store/models/jobs.model";
import type { RootState, RootStore } from "store/store";
import { setInterval } from "utils/timeout";

const store: { current?: RootStore } = {};

export function setStore(newStore: RootStore) {
	if (store.current) {
		throw "Store has already been set";
	}
	store.current = newStore;
}

export async function getStore() {
	if (store.current) {
		return store.current;
	}
	return new Promise<RootStore>((resolve, _, onCancel) => {
		const interval = setInterval(() => {
			if (store.current) {
				resolve(store.current);
				interval.clear();
			}
		}, 100);
		onCancel(() => {
			interval.clear();
		});
	});
}

export async function onJobChange<K extends keyof JobsState>(
	jobName: K,
	callback: (job: JobsState[K], state: RootState) => void,
) {
	const store = await getStore();
	let lastJob = store.getState().jobs[jobName];

	return store.changed.connect((newState) => {
		const job = newState.jobs[jobName];
		if (!shallowEqual(job, lastJob)) {
			lastJob = job;
			task.defer(callback, job, newState);
		}
	});
}

function shallowEqual(a: object, b: object) {
	for (const [key] of pairs(a)) {
		if (a[key as never] !== b[key as never]) {
			return false;
		}
	}
	return true;
}
