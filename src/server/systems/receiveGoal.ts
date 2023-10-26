import { World, useEvent } from "@rbxts/matter"
import { GoalPositions, Owner, Unit } from "shared/components"

function receiveGoal(world: World) {
	for (const [id, unit, owner, goals] of world.query(Unit, Owner, GoalPositions)) {
		for (const [_, plr, goalPos, clearGoals] of useEvent(unit.remotes.sendGoalPosition, "OnServerEvent")) {
			if (plr !== owner.player) continue

			const newQueue = (clearGoals as boolean) ? [] : [...goals.queue]
			newQueue.push(goalPos as Vector3)

			world.insert(
				id,
				goals.patch({
					queue: newQueue,
				}),
			)
		}
	}
}

export = receiveGoal
