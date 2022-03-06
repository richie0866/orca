import { useEffect, useMutable } from "@rbxts/roact-hooked";
import { clearInterval, setInterval } from "utils/timeout";

// https://usehooks-ts.com/react-hook/use-interval

export function useInterval(callback: () => void, delay?: number) {
	const savedCallback = useMutable(callback);
	savedCallback.current = callback;

	// Set up the interval.
	useEffect(() => {
		// Don't schedule if no delay is specified.
		// Note: 0 is a valid value for delay.
		if (delay === undefined) {
			return;
		}

		const id = setInterval(() => savedCallback.current(), delay);

		return () => clearInterval(id);
	}, [delay]);
}
