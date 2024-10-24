import { useDeltaTime, World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Position, Squad, SquadMember, Unit } from "game/shared/components"

function advancedPosition(pos: Vector3, goal: Vector3) {
	const distance = pos.sub(goal).Magnitude
	if (distance < 1) return goal

	return pos.add(goal.sub(pos).Unit.mul(useDeltaTime() * 10))
}

function moveSquadUnits(world: World) {
	for (const [unitId, squadMember, pos] of world.query(SquadMember, Position, Unit)) {
		const squad = world.contains(squadMember.squad) ? world.get(squadMember.squad, Squad) : undefined
		if (!squad) continue

		const goal = squad.goals.peek()
		if (!goal) continue

		world.insert(unitId, pos.patch({ value: advancedPosition(pos.value, goal) }))
	}
}

export = new System(moveSquadUnits)
