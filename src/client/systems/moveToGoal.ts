import { World, useDeltaTime } from "@rbxts/matter"
import { Goal } from "client/components"
import { Position, Speed } from "shared/components"

// TODO! Add client-side prediction, extrapolation, or anything else that fixes the jittering.
function getNextPosition(pos: Vector3, goal: Vector3, speed: number): Vector3 {
	const dt = useDeltaTime()
	const dir = goal.sub(pos).Unit
	const dist = goal.sub(pos).Magnitude
	const reachesGoal = dist <= speed * dt
	const offset = dir.mul(speed * dt)

	return reachesGoal ? goal : pos.add(offset)
}

function moveToGoal(world: World) {
	for (const [id, pos, goal, speed] of world.query(Position, Goal, Speed)) {
		world.insert(id, pos.patch({
			value: getNextPosition(pos.value, goal.value, speed.value)
		}))
	}
}

export = moveToGoal
