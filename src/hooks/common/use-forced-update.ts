import { useCallback, useState } from "@rbxts/roact-hooked";

export function useForcedUpdate() {
	const [, setState] = useState(0);
	return useCallback(() => setState((state) => state + 1), []);
}
