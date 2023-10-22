import { Players, ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import { Owner, Position, Unit } from "shared/components"
import startMatter from "shared/startMatter"
import { Replicated } from "./components"

const containers = [ServerScriptService.server.systems, ReplicatedStorage.shared.systems]
const serverState = {}
const world = startMatter(containers, serverState)

Players.PlayerAdded.Connect((player) => {
	world.spawn(
		Unit({}),
		Owner({ player }),
		Position({ value: Vector3.zero }),
		Replicated({ finishedFor: new Array() }),
	)
})
