import { World, useDeltaTime } from "@rbxts/matter"
import { ServerPosition } from "game/client/components"
import { System } from "game/shared/bootstrap"
import { Position, Speed } from "game/shared/components"

function getNextPosition(pos: Vector3, goal: Vector3, speed: number): Vector3 {
	const dt = useDeltaTime()
	const dir = goal.sub(pos).Unit
	const dist = goal.sub(pos).Magnitude
	const reachesGoal = dist <= speed * dt
	const offset = dir.mul(speed * dt)

	return reachesGoal ? goal : pos.add(offset)
}

function moveUnitToServerPos(world: World) {
	for (const [id, pos, serverPos, speed] of world.query(Position, ServerPosition, Speed)) {
		world.insert(id, pos.patch({
			value: getNextPosition(pos.value, serverPos.value, speed.value)
		}))
	}
}

export = new System(moveUnitToServerPos)
