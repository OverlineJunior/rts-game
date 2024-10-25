import { AnyEntity, World } from "@rbxts/matter"
import { Position, Speed, Unit } from "game/shared/components"

// This is a shared function, so don't forget that the components must be shared as well.
export function canMove(id: AnyEntity, world: World): boolean {
	return world.contains(id)
		&& world.get(id, Unit) !== undefined
		&& world.get(id, Position) !== undefined
		&& world.get(id, Speed) !== undefined
}
