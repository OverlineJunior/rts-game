import { AnyEntity } from "@rbxts/matter"
import Heightmap from "game/shared/heightmap"
import { SpatialGrid } from "game/shared/spatialGrid"

export interface ServerState {
	unitGrid: SpatialGrid<AnyEntity>
	heightmap: Heightmap
}
