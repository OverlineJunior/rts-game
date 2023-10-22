import { AnyComponent } from "@rbxts/matter/lib/component"
import { serializeComponents } from "shared/componentSerde"
import remotes from "shared/remotes"

const spawnOnClient = remotes.Server.Get("spawnOnClient")
const despawnOnClient = remotes.Server.Get("despawnOnClient")

const registeredIds: Array<number> = new Array()

/**
 * Spawns a new entity in each of the clients' worlds with the given components.
 * Note that the components must be either shared or client-sided, otherwise they'll be ignored.
 * @param clients The clients which the entity will be spawned for.
 * @param id The discriminator used for despawning the spawned entity later on.
 * @param components The components to spawn the entity with.
 */
export function spawnFor(clients: Array<Player>, id: number, components: Array<AnyComponent>) {
	spawnOnClient.SendToPlayers(clients, id, serializeComponents(components))
	registeredIds.push(id)
}

/**
 * Removes the entity in each of the clients' worlds.
 * @param clients The clients which the entity will be despawned for.
 * @param id The entity's discriminator.
 */
export function despawnFor(clients: Array<Player>, id: number) {
	assert(registeredIds.includes(id), `Cannot despawn entity of ID "${id}" because it has never been spawned`)

	despawnOnClient.SendToPlayers(clients, id)
}
