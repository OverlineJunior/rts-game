import { AnyComponent, AnyEntity, World } from "@rbxts/matter"
import { Players } from "@rbxts/services"
import { Renderable, Selectable } from "game/client/components"
import { Replicated } from "game/server/components"
import { spawnFor } from "game/server/entityReplication"
import { System } from "game/shared/bootstrap"
import { Owner, Position, Speed, Unit } from "game/shared/components"

// If an unit has any of these components, they will be replicated to the clients.
// This should be updated whenever units can have a new component that should replicated.
const REPLICATED_COMPONENTS = [Owner, Position, Speed, Renderable]

function getReplicatedComponents(world: World, id: AnyEntity): AnyComponent[] {
	return REPLICATED_COMPONENTS.mapFiltered(comp => world.get(id, comp))
}

// Server units with Replicated are spawned on each client, old or new.
function replicateUnitSpawn(world: World) {
	const players = Players.GetPlayers()

	for (const [id, repl, unit] of world.query(Replicated, Unit)) {
		const clientsLeft = players.filter(p => !repl.finishedFor.includes(p))
		if (clientsLeft.isEmpty()) continue

		spawnFor(
			clientsLeft,
			id,
			unit,
			Selectable({}),
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

export = new System(replicateUnitSpawn)
