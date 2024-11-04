import { ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import { runGame } from "game/shared/bootstrap"
import { ServerState } from "./serverState"
import { SpatialGrid } from "game/shared/spatialGrid"

const systems = [ServerScriptService.server, ReplicatedStorage.shared]

const state: ServerState = {
	unitGrid: new SpatialGrid(4)
}

const world = runGame(systems, state)
