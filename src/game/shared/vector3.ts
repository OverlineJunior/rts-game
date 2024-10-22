export function sumVector3(v: Vector3): number {
	return v.X + v.Y + v.Z
}

export function absVector3(v: Vector3): Vector3 {
	return new Vector3(math.abs(v.X), math.abs(v.Y), math.abs(v.Z))
}

export function fuzzyEqual(a: Vector3, b: Vector3, epsilon = 0.1): boolean {
	return sumVector3(absVector3(a.sub(b))) < epsilon
}