import { World } from "@rbxts/matter"
import { Goal, Replica } from "client/components"
import { Unit } from "shared/components"
import { sendUnitPosition } from "shared/remotes"

function receiveUnitPosition(world: World) {
	sendUnitPosition.OnClientEvent.Connect((serverId, unitPos) => {
		for (const [id, repl] of world.query(Replica, Unit)) {
			if (repl.serverId !== serverId) continue

			world.insert(id, Goal({ value: unitPos }))
		}
	})
}

export = receiveUnitPosition
