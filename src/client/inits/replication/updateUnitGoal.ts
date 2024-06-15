import { World } from "@rbxts/matter"
import { Goal, Replica } from "client/components"
import { Unit } from "shared/components"
import { sendUnitPositions } from "shared/remotes"

function receiveUnitPosition(world: World) {
	sendUnitPositions.OnClientEvent.Connect(unitPositions => {
		for (const [id, repl] of world.query(Replica, Unit)) {
			const goal = unitPositions.get(repl.serverId)
			if (!goal) continue

			world.insert(id, Goal({ value: goal }))
		}
	})
}

export = receiveUnitPosition
