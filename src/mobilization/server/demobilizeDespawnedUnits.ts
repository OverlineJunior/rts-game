import { World } from "@rbxts/matter"
import { Unit } from "game/shared/components"
import { demobilize } from "./mobilization"
import { System } from "game/shared/bootstrap"

function deselectDespawnedUnits(world: World) {
	for (const [id, unitRec] of world.queryChanged(Unit)) {
		if (unitRec.new) continue

		demobilize(id, world)
	}
}

export = new System(deselectDespawnedUnits, { priority: -math.huge })
