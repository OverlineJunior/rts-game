import { World } from "@rbxts/matter"
import { Goal } from "client/components"
import { Position } from "shared/components"

// If he server takes too long to send the new position, affected units would start moving behind the unaffected ones.
// To remedy this, we snap the client position to the server one so the affected unit doesn't lag behind *too much*.
function snapUnitToServer(world: World) {
	for (const [id, goal] of world.queryChanged(Goal)) {
		if (!goal.old || !world.contains(id) || !world.get(id, Position)) continue

		const pos = world.get(id, Position)!
		world.insert(id, pos.patch({ value: goal.old.value }))
	}
}

export = snapUnitToServer
