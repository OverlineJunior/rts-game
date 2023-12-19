import { World, useEvent } from "@rbxts/matter"
import { Goals, Owner, Unit } from "shared/components"

// Adds a goal to the end of the queue when requested by the client.
function receivePushGoal(world: World) {
	for (const [id, unit, owner, goals] of world.query(Unit, Owner, Goals)) {
		for (const [_, plr, goal] of useEvent(unit.remotes.pushGoal, "OnServerEvent")) {
			if (plr !== owner.player) continue

			const newQueue = [...goals.queue]
			newQueue.push(goal as Vector3)

			world.insert(
				id,
				goals.patch({
					queue: newQueue,
				}),
			)
		}
	}
}

export = receivePushGoal
