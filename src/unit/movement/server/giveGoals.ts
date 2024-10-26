import { AnyEntity, World } from "@rbxts/matter"
import { t } from "@rbxts/t"
import { System } from "game/shared/bootstrap"
import { Goal, Owner } from "game/shared/components"
import Queue from "game/shared/queue"
import { requestMovement } from "game/shared/remotes"
import { canRequestMovement } from "unit/shared/unitUtil"

function randomizeGoal(goal: Vector3, unitCount: number): Vector3 {
    const maxRadius = (unitCount - 1) * 0.075;

    const angle = math.random() * 2 * math.pi;
    const radius = math.random() * maxRadius;

    const xOffset = radius * math.cos(angle);
    const zOffset = radius * math.sin(angle);

    return goal.add(new Vector3(xOffset, 0, zOffset));
}

function giveGoals(world: World) {
	requestMovement.OnServerEvent.Connect((sender, serverUnits, goal, increment) => {
		if (
			!t.array(t.number)(serverUnits)
			|| !t.Vector3(goal)
			|| !t.boolean(increment)
			|| serverUnits.isEmpty()
		) return

		(serverUnits as AnyEntity[])
			.filter(id => canRequestMovement(id, world) && world.get(id, Owner)?.player === sender)
			.forEach(id => {
				const rGoal = randomizeGoal(goal, serverUnits.size())

				world.insert(id, Goal({
					queue: increment && world.get(id, Goal)
						? world.get(id, Goal)!.queue.enqueue(rGoal)
						: new Queue(rGoal)
				}))
			})
	})
}

export = new System(giveGoals, { type: "onStartup" })
