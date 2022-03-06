import { useEffect, useMutable } from "@rbxts/roact-hooked";

export function useDidMount(callback: Callback) {
	const ref = useMutable<() => void>(callback);
	useEffect(() => {
		if (ref.current) {
			ref.current();
		}
	}, []);
	return ref;
}

export function useIsMount(): boolean {
	const ref = useMutable(true);
	useEffect(() => {
		ref.current = false;
	}, []);
	return ref.current;
}
