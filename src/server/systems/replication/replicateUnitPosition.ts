import { AnyEntity, World, useThrottle } from "@rbxts/matter"
import { Position, Unit } from "shared/components"
import { sendUnitPositions } from "shared/remotes"

function replicateUnitPosition(world: World) {
	if (!useThrottle(1)) return

	const unitPositions = new Map<AnyEntity, Vector3>()
	for (const [id, pos] of world.query(Position, Unit)) {
		unitPositions.set(id, pos.value)
	}

	if (!unitPositions.isEmpty()) {
		sendUnitPositions.FireAllClients(unitPositions)
	}
}

export = replicateUnitPosition
