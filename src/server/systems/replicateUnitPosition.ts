import { World, useThrottle } from "@rbxts/matter"
import { Replicated } from "server/components"
import { Owner, Position, Unit } from "shared/components"

// TODO! Don't replicate if the unit isn't moving.
// Replicates the unit's position every few seconds.
function replicateUnitPosition(world: World) {
	for (const [id, unit, owner, pos] of world.query(Unit, Owner, Position, Replicated)) {
		if (!useThrottle(1, id)) continue

		unit.remotes.replicatePosition.FireClient(owner.player, pos.value)
	}
}

export = replicateUnitPosition
