import { World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Goal } from "game/shared/components"

function goalCleanup(world: World) {
	for (const [id, goal] of world.query(Goal)) {
		if (goal.queue.isEmpty()) {
			world.remove(id, Goal)
		}
	}
}

export = new System(goalCleanup, { priority: -math.huge })
