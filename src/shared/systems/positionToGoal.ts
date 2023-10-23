import { World, useDeltaTime } from "@rbxts/matter"
import { GoalPositions, Position } from "shared/components"

function positionToGoal(world: World) {
	for (const [id, pos, goals] of world.query(Position, GoalPositions)) {
		if (goals.queue.isEmpty()) continue

		const speed = 5
		const dt = useDeltaTime()

		const goalPos = goals.queue[0]
		const dir = goalPos.sub(pos.value).Unit
		const dist = goalPos.sub(pos.value).Magnitude
		const willFinishNow = dist <= speed * dt

		let newPos: Vector3

		if (willFinishNow) {
			newPos = goalPos
			goals.queue.shift()
		} else {
			newPos = pos.value.add(dir.mul(speed * dt))
		}

		world.insert(
			id,
			pos.patch({
				value: newPos,
			}),
		)
	}
}

export = positionToGoal
