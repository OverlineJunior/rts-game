import { World } from "@rbxts/matter"
import { demobilize } from "server/components/mobilization"
import { Unit } from "shared/components"

function deselectDespawnedUnits(world: World) {
	for (const [id, unitRec] of world.queryChanged(Unit)) {
		if (unitRec.new) continue

		demobilize(id, world)
	}
}

export = {
	system: deselectDespawnedUnits,
	priority: -math.huge, // Run first.
}
