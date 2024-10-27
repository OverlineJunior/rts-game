import { World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Acceleration, Goal, Position, Unit, Velocity } from "game/shared/components"

function moveUnitToGoal(world: World) {
	for (const [unitId, goal, pos, vel] of world.query(Goal, Position, Velocity, Unit)) {
		const goalPos = goal.queue.peek()!
		const dist = pos.value.sub(goalPos).Magnitude
		const dir = goalPos.sub(pos.value).Unit

		if (dist < 1) {
			world.insert(unitId, Goal({
				queue: goal.queue.dequeue()
			}))
		}

		world.insert(unitId, vel.patch({ value: dir.mul(10) }))
	}
}

export = new System(moveUnitToGoal)
