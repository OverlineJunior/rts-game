import { World } from "@rbxts/matter"
import { Replicated } from "server/components"
import { despawnFor } from "server/entityReplication"

// Server units that are despawned or have their Replicated removed have their
// replicas despawned for each client they were spawned for.
function replicateUnitDespawn(world: World) {
	for (const [id, replRec] of world.queryChanged(Replicated)) {
		if (!replRec.old || replRec.new) continue

		despawnFor(replRec.old.finishedFor, id)
	}
}

export = replicateUnitDespawn
