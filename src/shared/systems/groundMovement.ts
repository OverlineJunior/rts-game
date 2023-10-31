import { World, useDeltaTime } from "@rbxts/matter"
import { GoalPositions, Position, Speed } from "shared/components"

// Returned position is clamped to goal, meaning when it reaches or "goes past" goal, it *is* goal.
function getHorizontalPosition(currPos: Vector3, goal: Vector3, speed: number) {
	const dt = useDeltaTime()
	const dir = goal.sub(currPos).Unit
	const dist = goal.sub(currPos).Magnitude
	const reachedGoal = dist <= speed * dt

	const newPos = reachedGoal ? goal : currPos.add(dir.mul(speed * dt))

	return {
		x: newPos.X,
		z: newPos.Z,
	}
}

function getVerticalPosition() {
	return 0
}

function groundMovement(world: World) {
	for (const [id, pos, goals, speed] of world.query(Position, GoalPositions, Speed)) {
		if (goals.queue.isEmpty()) continue

		const goal = goals.queue[0]

		const xz = getHorizontalPosition(pos.value, goal, speed.base)
		const y = getVerticalPosition()
		const newPos = new Vector3(xz.x, y, xz.z)

		const queue = goals.queue

		if (newPos.X === goal.X && newPos.Z === goal.Z) {
			queue.shift()
		}

		world.insert(
			id,
			pos.patch({
				value: newPos,
				queue,
			}),
		)
	}
}

export = groundMovement
