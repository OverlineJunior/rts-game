export function getBounds(p1: Vector2, p2: Vector2): [Vector2, Vector2] {
	const minX = math.min(p1.X, p2.X)
	const maxX = math.max(p1.X, p2.X)
	const minY = math.min(p1.Y, p2.Y)
	const maxY = math.max(p1.Y, p2.Y)

	return [new Vector2(minX, minY), new Vector2(maxX, maxY)]
}

export function isWithinBounds(screenPos: Vector3, bounds: [Vector2, Vector2]): boolean {
	const [min, max] = bounds

	return screenPos.X >= min.X
		&& screenPos.X <= max.X
		&& screenPos.Y >= min.Y
		&& screenPos.Y <= max.Y
}
