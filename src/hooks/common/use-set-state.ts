import { useState } from "@rbxts/roact-hooked";

type SetStateAction<S> = Partial<S> | ((prevState: S) => Partial<S>);
type Dispatch<A> = (action: A) => void;

export default function useSetState<S>(initialState: S | (() => S)): [state: S, setState: Dispatch<SetStateAction<S>>] {
	const [state, setState] = useState(initialState);
	const merge = (action: SetStateAction<S>) =>
		setState((s) => ({
			...s,
			...(typeIs(action, "function") ? action(s) : action),
		}));
	return [state, merge];
}
