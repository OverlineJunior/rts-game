import { Players, ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import { GoalPositions, Owner, Position, Speed, Unit } from "shared/components"
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
		GoalPositions({ queue: [new Vector3(20, 0, 20), new Vector3(10, 0, 20), Vector3.zero] }),
		Speed({ base: 10 }),
		Replicated({ finishedFor: new Array() }),
	)
})
