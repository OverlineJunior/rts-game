import { AnyEntity, World } from "@rbxts/matter"
import { Position, Speed, Unit } from "game/shared/components"

// This is a shared function, so don't forget that components required for mobilization must be shared as well.
export function canMobilize(id: AnyEntity, world: World): boolean {
	return world.contains(id)
		&& world.get(id, Unit) !== undefined
		&& world.get(id, Position) !== undefined
		&& world.get(id, Speed) !== undefined
}
