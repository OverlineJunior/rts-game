import { useThrottle, World } from "@rbxts/matter"
import { sendUnitPosition } from "game/server/network"
import { System } from "game/shared/bootstrap"
import { Position, Unit } from "game/shared/components"

// In times per second.
const REPLICATION_RATE = 1 / 10

// TODO! Do not replicate when the unit is not moving.
// ! This is not as simple as it seems, because the unit might stop moving while replication
// ! is on interval, thus the latest position will not be catched.
function replicateUnitPosition(world: World) {
	for (const [id, pos] of world.query(Position, Unit)) {
		if (!useThrottle(REPLICATION_RATE, id)) continue

		const p = pos.value
		sendUnitPosition.fireAll({
			serverId: id,
			x: p.X,
			z: p.Z,
			orientation: 0,
		})
	}
}

export = new System(replicateUnitPosition)
