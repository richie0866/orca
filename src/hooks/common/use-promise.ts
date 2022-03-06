import { Reducer, useEffect, useReducer } from "@rbxts/roact-hooked";

// https://github.com/bsonntag/react-use-promise

type PromiseState = "pending" | "rejected" | "resolved";

interface State<T = any> {
	result?: T;
	err?: unknown;
	state: PromiseState;
}

interface Action {
	type: PromiseState;
	payload?: unknown;
}

function resolvePromise<T>(promise: Promise<T> | (() => Promise<T>)): Promise<T> {
	if (typeIs(promise, "function")) {
		return promise();
	}

	return promise;
}

const states: Record<PromiseState, PromiseState> = {
	pending: "pending",
	rejected: "rejected",
	resolved: "resolved",
};

const defaultState: State = {
	err: undefined,
	result: undefined,
	state: states.pending,
};

function reducer<T>(state: State<T>, action: Action): State<T> {
	switch (action.type) {
		case states.pending:
			return defaultState as State<T>;

		case states.resolved:
			return {
				err: undefined,
				result: action.payload as T,
				state: states.resolved,
			};

		case states.rejected:
			return {
				err: action.payload,
				result: undefined,
				state: states.rejected,
			};

		/* istanbul ignore next */
		default:
			return state;
	}
}

export function usePromise<T>(
	promise: Promise<T> | (() => Promise<T>),
	deps: unknown[] = [],
): [result: T | undefined, err: unknown | undefined, state: PromiseState] {
	const [{ err, result, state }, dispatch] = useReducer(reducer as Reducer<State<T>, Action>, defaultState);

	useEffect(() => {
		promise = resolvePromise<T>(promise);

		if (!promise) {
			return;
		}

		let canceled = false;

		dispatch({ type: states.pending });

		promise.then(
			(result) =>
				!canceled &&
				dispatch({
					payload: result,
					type: states.resolved,
				}),
			(err) =>
				!canceled &&
				dispatch({
					payload: err,
					type: states.rejected,
				}),
		);

		return () => {
			canceled = true;
		};
	}, deps);

	return [result, err, state];
}
