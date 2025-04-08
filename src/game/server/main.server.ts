import { ReplicatedStorage, ServerScriptService, Workspace } from "@rbxts/services"
import { runGame } from "game/shared/bootstrap"
import { ServerState } from "./serverState"
import { SpatialGrid } from "game/shared/spatialGrid"
import Heightmap from "game/shared/heightmap"

const systems = [ServerScriptService.server, ReplicatedStorage.shared]

const state: ServerState = {
	unitGrid: new SpatialGrid(4)
}

const world = runGame(systems, state)

const map = new Heightmap(Workspace.FindFirstChild("map")! as Model)
const part = Workspace.FindFirstChild("Part")! as Part

while (true) {
	task.wait()

	const cell = map.get(part.Position)
	if (!cell) continue

	print(`${cell.altitude}, ${cell.part}`)
}
