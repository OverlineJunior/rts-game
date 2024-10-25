import { World } from "@rbxts/matter"
import { Replica, ServerPosition } from "game/client/components"
import { System } from "game/shared/bootstrap"
import { Unit } from "game/shared/components"
import { deserializePositionals } from "game/shared/positionals"
import { sendUnitPosition } from "game/shared/remotes"

function updateUnitServerPos(world: World) {
	sendUnitPosition.OnClientEvent.Connect((serverId, unitPos) => {
		for (const [id, repl] of world.query(Replica, Unit)) {
			if (repl.serverId !== serverId) continue

			const p = deserializePositionals(unitPos)
			world.insert(id, ServerPosition({ value: new Vector3(p.x, 0, p.z) }))
		}
	})
}

export = new System(updateUnitServerPos, { type: "onStartup" })
