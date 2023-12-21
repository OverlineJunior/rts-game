import { World, useEvent } from "@rbxts/matter"
import { Position, Unit } from "shared/components"

// TODO! Make it go smoothly.
// Smoothly updates the unit's position based on the server unit's position.
function updateUnitPosition(world: World) {
	for (const [id, unit, pos] of world.query(Unit, Position)) {
		for (const [_, newPos] of useEvent(unit.remotes.replicatePosition, "OnClientEvent")) {
			world.insert(id, pos.patch({ value: newPos }))
		}
	}
}

export = updateUnitPosition
