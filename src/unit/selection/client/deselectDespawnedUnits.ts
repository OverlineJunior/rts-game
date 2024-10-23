import { World } from "@rbxts/matter"
import { ClientState } from "game/client/clientState"
import { System } from "game/shared/bootstrap"
import { Unit } from "game/shared/components"

function deselectDespawnedUnits(world: World, state: ClientState) {
	for (const [id, unitRec] of world.queryChanged(Unit)) {
		const i = state.selection.units.indexOf(id)

		if (unitRec.new || i === -1) continue

		state.selection.units.remove(i)
	}
}

// Runs first, but does not guarantee the unit IDs are valid.
export = new System(deselectDespawnedUnits, { priority: -math.huge })
