import { World } from "@rbxts/matter"
import { Replicated } from "server/components"
import { despawnFor } from "server/entityReplication"

// Despawns the client version of the unit when it's no longer replicated.
function replicateUnitDespawn(world: World) {
	for (const [id, replRec] of world.queryChanged(Replicated)) {
		if (!replRec.old || replRec.new) continue

		despawnFor(replRec.old.finishedFor, id)
	}
}

export = replicateUnitDespawn
