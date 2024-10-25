import { AnyEntity, World } from "@rbxts/matter"
import { Unit, Position, Speed } from "game/shared/components"

/**
 * Returns wether the client can request movement for the given entity.
 */
export function canRequestMovement(id: AnyEntity, world: World): boolean {
	// This is a shared function, so don't forget the components must be shared as well.
	return world.contains(id)
		&& world.get(id, Unit) !== undefined
		&& world.get(id, Position) !== undefined
		&& world.get(id, Speed) !== undefined
}
