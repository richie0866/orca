export function applyUDim2(vector: Vector2, udim2: UDim2, scaleFactor = 1): Vector2 {
	return new Vector2(
		udim2.X.Offset + (udim2.X.Scale / scaleFactor) * vector.X,
		udim2.Y.Offset + (udim2.Y.Scale / scaleFactor) * vector.Y,
	);
}
