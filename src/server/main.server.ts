import { Players, ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import { GoalPositions, Owner, Position, Unit } from "shared/components"
import startMatter from "shared/startMatter"
import { Replicated } from "./components"

const containers = [ServerScriptService.server.systems, ReplicatedStorage.shared.systems]
const serverState = {}
const world = startMatter(containers, serverState)

Players.PlayerAdded.Connect((player) => {
	world.spawn(
		Unit({ kind: "TestUnit" }),
		Owner({ player }),
		Position({ value: Vector3.zero }),
		GoalPositions({ queue: [new Vector3(5, 0, 5)] }),
		Replicated({ finishedFor: new Array() }),
	)
})
