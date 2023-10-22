import { World } from "@rbxts/matter"
import { Players } from "@rbxts/services"
import { Replicated } from "server/components"
import { spawnFor } from "server/entityReplication"
import { GoalPositions, Owner, Position, Unit } from "shared/components"

function replicateUnitSpawn(world: World) {
	for (const [id, repl, unit, owner, pos, goals] of world.query(Replicated, Unit, Owner, Position, GoalPositions)) {
		const clientsLeft = Players.GetPlayers().filter((c) => !repl.finishedFor.includes(c))
		if (clientsLeft.isEmpty()) continue

		spawnFor(clientsLeft, id, [unit, owner, pos, goals])

		world.insert(
			id,
			repl.patch({
				finishedFor: [...repl.finishedFor, ...clientsLeft],
			}),
		)
	}
}

export = replicateUnitSpawn
