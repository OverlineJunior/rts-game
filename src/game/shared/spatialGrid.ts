type Hash = string

export class SpatialGrid<V extends defined> {
	constructor(
		readonly cellSize: number,
		private cells: Map<Hash, Set<V>> = new Map(),
	) {}

	/**
	 * Snaps the given value to the grid based on the unsnapped x and z coordinates.
	 */
	insert(value: V, x: number, z: number): void {
		const hash = this.snapHash(x, z)

		if (!this.cells.has(hash)) {
			this.cells.set(hash, new Set())
		}

		this.cells.get(hash)!.add(value)
	}

	/**
	 * Removes the given value from the grid based on the unsnapped x and z coordinates.
	 */
	remove(value: V, x: number, z: number): void {
		const hash = this.snapHash(x, z)

		const values = this.cells.get(hash)
		if (!values) return

		values.delete(value)

		if (values.isEmpty()) {
			this.cells.delete(hash)
		}
	}

	/**
	 * Query the grid for values within the cells that overlap with the range around the given x and z coordinates.
	 *
	 * Note that it may return values that do not overlap with the range; what overlaps is the cells that contain the values.
	 * To get values that only overlap within a given range, you must filter the results with distance checks.
	 */
	query(x: number, z: number, range: number): V[] {
		const minX = this.snap(x - range)
		const maxX = this.snap(x + range)
		const minZ = this.snap(z - range)
		const maxZ = this.snap(z + range)

		const inRange: V[] = []

		for (let i = minX; i <= maxX; i++) {
			for (let j = minZ; j <= maxZ; j++) {
				const cell = this.cells.get(this.hash(i, j))
				if (!cell) continue

				for (const v of cell) {
					inRange.push(v)
				}
			}
		}

		return inRange
	}

	private snap(n: number): number {
		return math.floor(n / this.cellSize)
	}

	private hash(x: number, z: number): string {
		return `(${x}, ${z})`
	}

	private snapHash(x: number, z: number): string {
		return this.hash(this.snap(x), this.snap(z))
	}
}
