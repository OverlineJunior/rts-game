import { AnyEntity, World, useDeltaTime } from "@rbxts/matter"
import { Mobilization } from "server/components"
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

// Returns the unit's new position.
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
		mob.units.forEach(unit => {
			const currGoal = mob.goalQueue[0]
			if (!currGoal) return

			const newPos = move(unit, currGoal, world)

			if (newPos === currGoal) {
				const goalQueue = mob.goalQueue
				goalQueue.shift()

				world.insert(mobId, mob.patch({ goalQueue }))
			}
		})
	}
}

export = moveMobilization
