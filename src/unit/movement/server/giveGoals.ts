import { AnyEntity, World } from "@rbxts/matter"
import { t } from "@rbxts/t"
import { System } from "game/shared/bootstrap"
import { Goal, Owner } from "game/shared/components"
import Queue from "game/shared/queue"
import { requestMovement } from "game/server/network"
import { canRequestMovement } from "unit/shared/unitUtil"

function randomizeGoal(goal: Vector3, unitCount: number): Vector3 {
    const maxRadius = (unitCount - 1) * 0.2;

    const angle = math.random() * 2 * math.pi;
    const radius = math.random() * maxRadius;

    const xOffset = radius * math.cos(angle);
    const zOffset = radius * math.sin(angle);

    return goal.add(new Vector3(xOffset, 0, zOffset));
}

function giveGoals(world: World) {
	requestMovement.on((sender, { serverIds, x, z, increment }) => {
		const goal = new Vector3(x, 0, z)

		if (
			!t.array(t.number)(serverIds)
			|| !t.Vector3(goal)
			|| !t.boolean(increment)
			|| serverIds.isEmpty()
		) return

		(serverIds as AnyEntity[])
			.filter(id => canRequestMovement(id, world) && world.get(id, Owner)?.player === sender)
			.forEach(id => {
				const rGoal = randomizeGoal(goal, serverIds.size())

				world.insert(id, Goal({
					queue: increment && world.get(id, Goal)
						? world.get(id, Goal)!.queue.enqueue(rGoal)
						: new Queue(rGoal)
				}))
			})
	})
}

export = new System(giveGoals, { type: "onStartup" })
