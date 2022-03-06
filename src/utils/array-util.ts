export function arrayToMap<T, K, V>(
	arr: T[],
	mapper: (value: T, index: number, array: readonly T[]) => [K, V],
): Map<K, V> {
	return new Map(arr.map(mapper));
}
