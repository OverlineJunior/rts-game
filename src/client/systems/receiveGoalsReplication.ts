import { World, useEvent } from "@rbxts/matter"
import { GoalPositions, Unit } from "shared/components"

function receiveGoalsReplication(world: World) {
	for (const [id, unit, goals] of world.query(Unit, GoalPositions)) {
		for (const [_, goalQueue] of useEvent(unit.remotes.replicateGoalQueue, "OnClientEvent")) {
			world.insert(
				id,
				goals.patch({
					queue: goalQueue,
				}),
			)
		}
	}
}

export = receiveGoalsReplication
