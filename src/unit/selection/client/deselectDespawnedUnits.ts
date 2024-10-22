import { World } from "@rbxts/matter"
import { ClientState } from "client/clientState"
import { Unit } from "shared/components"

function deselectDespawnedUnits(world: World, state: ClientState) {
	for (const [id, unitRec] of world.queryChanged(Unit)) {
		const i = state.selection.units.indexOf(id)

		if (unitRec.new || i === -1) continue

		state.selection.units.remove(i)
	}
}

export = {
	system: deselectDespawnedUnits,
	// Run first. Does not guarantee the unit IDs are valid.
	priority: -math.huge,
}
