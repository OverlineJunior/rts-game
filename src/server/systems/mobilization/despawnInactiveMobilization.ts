import { World } from "@rbxts/matter"
import { Mobilization } from "server/components"

// Inactive as in no units or no goals.
function despawnInactiveMobilization(world: World) {
	for (const [id, mobRec] of world.queryChanged(Mobilization)) {
		if (!mobRec.new) continue

		if (mobRec.new.goalQueue.isEmpty() || mobRec.new.units.isEmpty()) {
			world.despawn(id)
		}
	}
}

export = {
	system: despawnInactiveMobilization,
	priority: -math.huge, // Run first.
}
