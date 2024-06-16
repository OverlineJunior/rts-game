import { AnyEntity, World, useDeltaTime } from "@rbxts/matter"
import { Mobilization } from "server/components"
import { dequeueGoal } from "server/components/mobilization"
import { Position, Speed } from "shared/components"

// Returned position is clamped so it doesn't go past the goal.
function getNextPosition(currPos: Vector3, goal: Vector3, speed: number): Vector3 {
	const dt = useDeltaTime()
	const dir = goal.sub(currPos).Unit
	const dist = goal.sub(currPos).Magnitude
	const reachesGoal = dist <= speed * dt
	const offset = dir.mul(speed * dt)

	return reachesGoal ? goal : currPos.add(offset)
}

// Moves the unit and returns its new position.
function move(unit: AnyEntity, goal: Vector3, world: World): Vector3 {
	// No unit should be mobilized without a Position or Speed, so we panic.
	const pos = world.get(unit, Position)!
	const speed = world.get(unit, Speed)!

	const newPos = getNextPosition(pos.value, goal, speed.value)
	world.insert(unit, pos.patch({ value: newPos }))
	return newPos
}

function moveMobilization(world: World) {
	for (const [mobId, mob] of world.query(Mobilization)) {
		if (!world.contains(mob.leader) || mob.goalQueue.isEmpty()) continue

		const currGoal = mob.goalQueue[0]
		const leaderNewPos = move(mob.leader, currGoal, world)

		// TODO! For now, units snap to the leader's position. When we implement formations, this is probably where we'll do it.
		mob.units.forEach(unit => {
			if (!world.contains(unit)) return

			const pos = world.get(unit, Position)!
			world.insert(unit, pos.patch({ value: leaderNewPos }))
		})

		if (leaderNewPos === currGoal) {
			dequeueGoal(mobId, world)
		}
	}
}

export = moveMobilization
