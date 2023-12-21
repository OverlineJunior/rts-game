import { AnyEntity, World } from "@rbxts/matter"
import { Players } from "@rbxts/services"
import { Replicated } from "server/components"
import { spawnFor } from "server/entityReplication"
import { Owner, Position, Speed, Unit } from "shared/components"

// If an unit has any of these components, they will be replicated to the clients.
// This should be updated whenever units can have a new component that should replicated.
const REPLICATED_COMPONENTS = [Owner, Position, Speed]

function getRemainingComponents(world: World, id: AnyEntity) {
	return REPLICATED_COMPONENTS.filter((ctor) => world.get(id, ctor) !== undefined).map((ctor) => world.get(id, ctor)!)
}

// Spawns the client version of the unit when Replicated is first added.
function replicateUnitSpawn(world: World) {
	for (const [id, repl, unit] of world.query(Replicated, Unit)) {
		const clientsLeft = Players.GetPlayers().filter((c) => !repl.finishedFor.includes(c))
		if (clientsLeft.isEmpty()) continue

		spawnFor(clientsLeft, id, [unit, ...getRemainingComponents(world, id)])

		world.insert(
			id,
			repl.patch({
				finishedFor: [...repl.finishedFor, ...clientsLeft],
			}),
		)
	}
}

export = replicateUnitSpawn
