import { useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { clearTimeout, setTimeout, Timeout } from "utils/timeout";

function clearTimeoutRef(timeoutRef: { current: Timeout[] }) {
	for (const timeout of timeoutRef.current) {
		clearTimeout(timeout);
	}
	timeoutRef.current.clear();
}

export function useDelayedState<T>(value: T, delay: number, isImmediate?: (current: T) => boolean): T {
	const [delayedValue, setDelayedValue] = useState(value);
	const timeoutRef = useMutable<Timeout[]>([]);

	useEffect(() => {
		if (isImmediate?.(value)) {
			clearTimeoutRef(timeoutRef);
			setDelayedValue(value);
			return;
		}

		const timeout = setTimeout(() => {
			setDelayedValue(value);
			timeoutRef.current.remove(timeoutRef.current.indexOf(timeout));
		}, delay);

		timeoutRef.current.push(timeout);
	}, [value]);

	useEffect(() => {
		return () => clearTimeoutRef(timeoutRef);
	}, []);

	return delayedValue;
}
