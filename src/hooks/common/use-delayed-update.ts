import { useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { clearTimeout, setTimeout, Timeout } from "utils/timeout";

interface IncomingUpdate {
	timeout: Timeout;
	resolveTime: number;
}

let nextId = 0;

function clearUpdates(updates: Map<number, IncomingUpdate>, laterThan?: number) {
	for (const [id, update] of updates) {
		if (laterThan === undefined || update.resolveTime >= laterThan) {
			updates.delete(id);
			clearTimeout(update.timeout);
		}
	}
}

export function useDelayedUpdate<T>(value: T, delay: number, isImmediate?: (current: T) => boolean): T {
	const [delayedValue, setDelayedValue] = useState(value);
	const updates = useMutable(new Map<number, IncomingUpdate>());

	useEffect(() => {
		// Cancel all updates if the change is immediate
		if (isImmediate?.(value)) {
			clearUpdates(updates.current);
			setDelayedValue(value);
			return;
		}

		const id = nextId++;
		const update: IncomingUpdate = {
			timeout: setTimeout(() => {
				setDelayedValue(value);
				updates.current.delete(id);
			}, delay),
			resolveTime: os.clock() + delay,
		};

		// Clear all updates that are later than the current one to prevent overlap
		clearUpdates(updates.current, update.resolveTime);

		updates.current.set(id, update);
	}, [value]);

	useEffect(() => {
		return () => clearUpdates(updates.current);
	}, []);

	return delayedValue;
}
