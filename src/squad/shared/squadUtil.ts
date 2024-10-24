import { AnyEntity, World } from "@rbxts/matter"
import { Position, Speed, SquadMember, Unit } from "game/shared/components"

// This is a shared function, so don't forget that components required to be in a squad must be shared as well.
export function canBeInSquad(id: AnyEntity, world: World): boolean {
	return world.contains(id)
		&& world.get(id, Unit) !== undefined
		&& world.get(id, Position) !== undefined
		&& world.get(id, Speed) !== undefined
}

export function squadMemberCount(squadId: AnyEntity, world: World): number {
	let count = 0

	for (const [_, squadMember] of world.query(SquadMember)) {
		if (squadMember.squad === squadId) {
			count++
		}
	}

	return count
}
