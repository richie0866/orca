export function map(n: number, min0: number, max0: number, min1: number, max1: number): number {
	return min1 + ((n - min0) * (max1 - min1)) / (max0 - min0);
}

export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}
