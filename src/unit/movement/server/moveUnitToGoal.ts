import { useDeltaTime, World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Goal, Position, Unit } from "game/shared/components"

function advance(pos: Vector3, goal: Vector3) {
	const distance = pos.sub(goal).Magnitude
	if (distance < 1) return goal

	return pos.add(goal.sub(pos).Unit.mul(useDeltaTime() * 10))
}

function moveUnitToGoal(world: World) {
	for (const [unitId, goal, pos] of world.query(Goal, Position, Unit)) {
		const goalPos = goal.queue.peek()!
		const newPos = advance(pos.value, goalPos)

		if (newPos === goalPos) {
			world.insert(unitId, Goal({
				queue: goal.queue.dequeue()
			}))
		}

		world.insert(unitId, pos.patch({ value: newPos }))
	}
}

export = new System(moveUnitToGoal)
