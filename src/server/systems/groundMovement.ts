import { World, useDeltaTime } from "@rbxts/matter"
import { Goals, Position, Speed } from "shared/components"

function getPosition(currPos: Vector3, goal: Vector3, speed: number) {
	const dt = useDeltaTime()
	const dir = goal.sub(currPos).Unit
	const dist = goal.sub(currPos).Magnitude
	const reachedGoal = dist <= speed * dt

	return reachedGoal ? goal : currPos.add(dir.mul(speed * dt))
}

// ! This will be temporary until heightmap based movement is implemented.
// Gradually moves Position towards the first goal, removing it from the queue when reached.
function groundMovement(world: World) {
	for (const [id, pos, goals, speed] of world.query(Position, Goals, Speed)) {
		if (goals.queue.isEmpty()) continue

		const goal = goals.queue[0]
		const newPos = getPosition(pos.value, goal, speed.base)
		world.insert(id, pos.patch({ value: newPos }))

		const newQueue = [...goals.queue]
		if (newPos.X === goal.X && newPos.Z === goal.Z) {
			newQueue.shift()
		}
		world.insert(id, goals.patch({ queue: newQueue }))
	}
}

export = groundMovement
