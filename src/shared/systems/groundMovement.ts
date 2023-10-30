import { World, useDeltaTime } from "@rbxts/matter"
import { GoalPositions, Position, Speed } from "shared/components"

function groundMovement(world: World) {
	for (const [id, pos, goals, speed] of world.query(Position, GoalPositions, Speed)) {
		if (goals.queue.isEmpty()) continue

		const goalPos = goals.queue[0]
		const dir = goalPos.sub(pos.value).Unit
		const dist = goalPos.sub(pos.value).Magnitude
		const dt = useDeltaTime()
		const willFinishNow = dist <= speed.base * dt

		let newPos: Vector3

		if (willFinishNow) {
			newPos = goalPos

			const shifted = [...goals.queue]
			shifted.shift()

			world.insert(
				id,
				goals.patch({
					queue: shifted,
				}),
			)
		} else {
			newPos = pos.value.add(dir.mul(speed.base * dt))
		}

		world.insert(
			id,
			pos.patch({
				value: newPos,
			}),
		)
	}
}

export = groundMovement
