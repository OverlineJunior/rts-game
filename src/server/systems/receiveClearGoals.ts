import { World, useEvent } from "@rbxts/matter"
import { Goals, Owner, Unit } from "shared/components"

// Clears the goals when requested by the client.
function receiveClearGoals(world: World) {
	for (const [id, unit, owner, goals] of world.query(Unit, Owner, Goals)) {
		for (const [_, plr] of useEvent(unit.remotes.clearGoals, "OnServerEvent")) {
			if (plr !== owner.player) continue

			world.insert(
				id,
				goals.patch({
					queue: [],
				}),
			)
		}
	}
}

export = receiveClearGoals
