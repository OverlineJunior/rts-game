import { ReplicatedStorage, ServerScriptService, Workspace } from "@rbxts/services"
import { runGame } from "game/shared/bootstrap"
import { ServerState } from "./serverState"
import { SpatialGrid } from "game/shared/spatialGrid"
import Heightmap from "game/shared/heightmap"

const systems = [ServerScriptService.server, ReplicatedStorage.shared]

const state: ServerState = {
	unitGrid: new SpatialGrid(4),
	heightmap: new Heightmap(Workspace.FindFirstChild("map")! as Model),
}

const world = runGame(systems, state)
