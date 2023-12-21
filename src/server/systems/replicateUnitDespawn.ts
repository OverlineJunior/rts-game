import { World } from "@rbxts/matter"
import { Replicated } from "server/components"
import { despawnFor } from "server/entityReplication"
import { Unit } from "shared/components"

// Despawns the client version of the unit when it's no longer replicated.
function replicateUnitDespawn(world: World) {
	for (const [id, replRec] of world.queryChanged(Replicated)) {
		const noUnit = world.contains(id) && !world.get(id, Unit)
		if (!replRec.old || replRec.new || noUnit) continue

		despawnFor(replRec.old.finishedFor, id)
	}
}

export = replicateUnitDespawn
