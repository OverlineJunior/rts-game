import { World } from "@rbxts/matter"
import { Replica, ServerPosition } from "game/client/components"
import { System } from "game/shared/bootstrap"
import { Unit } from "game/shared/components"
import { sendUnitPosition } from "game/shared/remotes"

function updateUnitServerPos(world: World) {
	sendUnitPosition.OnClientEvent.Connect((serverId, unitPos) => {
		for (const [id, repl] of world.query(Replica, Unit)) {
			if (repl.serverId !== serverId) continue

			world.insert(id, ServerPosition({ value: unitPos }))
		}
	})
}

export = new System(updateUnitServerPos, { type: "onStartup" })
