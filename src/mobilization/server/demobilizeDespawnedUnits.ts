import { World } from "@rbxts/matter"
import { Unit } from "game/shared/components"
import { demobilize } from "./mobilization"

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
