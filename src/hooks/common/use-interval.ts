import { useEffect } from "@rbxts/roact-hooked";
import { clearInterval, setInterval } from "utils/timeout";

export function useInterval(callback: () => void, delay?: number, deps: unknown[] = []) {
	useEffect(() => {
		if (delay !== undefined) {
			const interval = setInterval(callback, delay);
			return () => clearInterval(interval);
		}
	}, [callback, delay, ...deps]);

	return setInterval;
}
