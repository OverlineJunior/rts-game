import { AnyComponent, AnyEntity, World } from "@rbxts/matter"
import { Players } from "@rbxts/services"
import { Replica } from "client/components"
import { Replicated } from "server/components"
import { spawnFor } from "server/entityReplication"
import { Owner, Position, Speed, Unit } from "shared/components"

// If an unit has any of these components, they will be replicated to the clients.
// This should be updated whenever units can have a new component that should replicated.
const REPLICATED_COMPONENTS = [Owner, Position, Speed]

function getReplicatedComponents(world: World, id: AnyEntity): AnyComponent[] {
	return REPLICATED_COMPONENTS.mapFiltered(comp => world.get(id, comp))
}

// Server units with Replicated are spawned on each client, old or new.
function replicateUnitSpawn(world: World) {
	for (const [id, repl, unit] of world.query(Replicated, Unit)) {
		const clientsLeft = Players.GetPlayers().filter((c) => !repl.finishedFor.includes(c))
		if (clientsLeft.isEmpty()) continue

		spawnFor(
			clientsLeft,
			id,
			unit,
			Replica({ serverId: id }),
			...getReplicatedComponents(world, id)
		)

		world.insert(
			id,
			repl.patch({
				finishedFor: [...repl.finishedFor, ...clientsLeft],
			}),
		)
	}
}

export = replicateUnitSpawn
