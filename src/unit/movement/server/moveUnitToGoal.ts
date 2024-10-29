import { World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Goal, Position, Speed, Unit, Velocity } from "game/shared/components"

function moveUnitToGoal(world: World) {
	for (const [unitId, goal, pos, vel, speed] of world.query(Goal, Position, Velocity, Speed, Unit)) {
		const goalPos = goal.queue.peek()!
		const dist = pos.value.sub(goalPos).Magnitude
		let dir = goalPos.sub(pos.value).Unit
		dir = new Vector3(dir.X, 0, dir.Z)

		// While using a bigger distance threshold is less precise, it allows units to reach their goal
		// faster, without getting stuck between other units because of flocking.
		if (dist < 1) {
			world.insert(unitId, Goal({
				queue: goal.queue.dequeue()
			}))
		}

		world.insert(unitId, vel.patch({ value: dir.mul(speed.value) }))
	}
}

export = new System(moveUnitToGoal)
