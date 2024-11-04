import { AnyEntity } from "@rbxts/matter"
import { SpatialGrid } from "game/shared/spatialGrid"

export interface ServerState {
	unitGrid: SpatialGrid<AnyEntity>
}
