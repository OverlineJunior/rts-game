import { Workspace } from "@rbxts/services"

/*
TODO!
export type AltitudeKind =
	| "Water" // For water and flying units.
	| "Ground" // For ground, flying and phasing units.
	| "Tall" // For flying and phasing units.
	| "SkyTall" // For phasing units.
*/

export interface HeightmapCell {
	readonly height: number
	readonly altitude: number
	// readonly altitudeKind: AltitudeKind
	readonly normal: Vector3
	readonly part: BasePart
}

export type HeightmapGrid = HeightmapCell[][]

// How many cells to divide the map into (resolution x resolution).
const RESOLUTION = 200
// The y offset to use when raycasting down from the top of the map.
// This is so the ray doesn't skip parts that are too close to the top of the map.
const RAY_YOFFSET = 0.1

export default class Heightmap {
	public readonly map: Model
	public readonly grid: HeightmapGrid

	constructor(map: Model) {
		this.map = map
		this.grid = this.scanMap()
	}

	get(position: Vector3): HeightmapCell | undefined {
		const rowCol = this.vector3ToRowCol(position)
		if (!rowCol) return

		const [row, col] = rowCol
		if (row < 0 || row >= RESOLUTION || col < 0 || col >= RESOLUTION) return

		return this.grid[row][col]
	}

	private vector3ToRowCol(vec: Vector3): [number, number] | undefined {
		const size = this.map.GetExtentsSize()
		const pos = this.map.GetPivot().Position
		const topCorner = new Vector3(
			pos.X - size.X / 2,
			pos.Y + size.Y / 2,
			pos.Z - size.Z / 2,
		)

		const cellWidth = size.X / RESOLUTION
		const cellHeight = size.Z / RESOLUTION

		// `vec` relative to the top corner of the map.
		const x = vec.X - topCorner.X
		const z = vec.Z - topCorner.Z

		const row = math.floor(z / cellHeight)
		const col = math.floor(x / cellWidth)

		if (row < 0 || row >= RESOLUTION || col < 0 || col >= RESOLUTION) {
			return
		}

		return [row, col]
	}

	private scanMap(): HeightmapGrid {
		const size = this.map.GetExtentsSize()
		const pos = this.map.GetPivot().Position
		const topCorner = new Vector3(
			pos.X - size.X / 2,
			pos.Y + size.Y / 2,
			pos.Z - size.Z / 2,
		)

		const cellWidth = size.X / RESOLUTION
		const cellHeight = size.Z / RESOLUTION

		let grid: HeightmapGrid = []

		for (let row = 0; row < RESOLUTION; row++) {
			const rowCells: HeightmapCell[] = []

			for (let col = 0; col < RESOLUTION; col++) {
				const top = pos.Y + size.Y / 2
				const bottom = pos.Y - size.Y / 2

				const x = topCorner.X + col * cellWidth + cellWidth / 2
				const z = topCorner.Z + row * cellHeight + cellHeight / 2

				const raycastRes = Workspace.Raycast(
					new Vector3(x, top + RAY_YOFFSET, z),
					Vector3.yAxis.mul(-size.Y - RAY_YOFFSET),
				)
				assert(
					raycastRes,
					`Could not raycast at (${x}, _, ${z}) while scanning map
					${this.map.GetFullName()} for its heightmap`
				)
				rowCells.push({
					height: raycastRes.Position.Y,
					altitude: raycastRes.Position.Y - bottom,
					normal: raycastRes.Normal,
					part: raycastRes.Instance,
				})
			}

			grid.push(rowCells)
		}

		return grid
	}
}
