import { World } from "@rbxts/matter"
import { Replica, ServerPosition } from "game/client/components"
import { sendUnitPosition } from "game/client/network"
import { System } from "game/shared/bootstrap"
import { Unit } from "game/shared/components"

function updateUnitServerPos(world: World) {
	sendUnitPosition.on(({ serverId, x, y, z, orientation }) => {
		for (const [id, repl] of world.query(Replica, Unit)) {
			if (repl.serverId !== serverId) continue

			world.insert(id, ServerPosition({ value: new Vector3(x, y, z) }))
		}
	})
}

export = new System(updateUnitServerPos, { type: "onStartup" })
