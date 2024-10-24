import { AnyEntity, World } from "@rbxts/matter"
import { Position, Speed, Unit } from "game/shared/components"

// This is a shared function, so don't forget that components required to be in a squad must be shared as well.
export function canBeInSquad(id: AnyEntity, world: World): boolean {
	return world.contains(id)
		&& world.get(id, Unit) !== undefined
		&& world.get(id, Position) !== undefined
		&& world.get(id, Speed) !== undefined
}
