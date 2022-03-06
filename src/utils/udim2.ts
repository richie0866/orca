export function px(x: number, y: number) {
	return new UDim2(0, x, 0, y);
}

export function scale(x: number, y: number) {
	return new UDim2(x, 0, y, 0);
}

export function applyUDim2(size: Vector2, udim2: UDim2, scaleFactor = 1): Vector2 {
	return new Vector2(
		udim2.X.Offset + (udim2.X.Scale / scaleFactor) * size.X,
		udim2.Y.Offset + (udim2.Y.Scale / scaleFactor) * size.Y,
	);
}
