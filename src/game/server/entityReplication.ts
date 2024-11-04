import { AnyEntity } from "@rbxts/matter"
import { AnyComponent } from "@rbxts/matter/lib/component"
import { serializeComponents } from "game/shared/componentSerde"
import { spawnOnClient, despawnOnClient } from "game/server/network"

const registeredIds: Array<number> = new Array()

/**
 * Spawns a new entity in each of the clients' worlds with the given components.
 * Note that the components must be either shared or client-sided, otherwise they'll be ignored.
 *
 * The client entity automatically receives a Replica component with the server's entity ID.
 *
 * @param clients The clients which the entity will be spawned for.
 * @param id The discriminator used for despawning the spawned entity later on.
 * @param components The components to spawn the entity with.
 */
export function spawnFor(clients: Player[], id: AnyEntity, ...components: Array<AnyComponent>) {
	if (clients.isEmpty()) return

	clients.forEach(client => spawnOnClient.fire(client, {
		serverId: id,
		serializedComponents: serializeComponents(components)
	}))
	registeredIds.push(id)
}

/**
 * Removes the entity in each of the clients' worlds.
 * @param clients The clients which the entity will be despawned for.
 * @param id The entity's discriminator.
 */
export function despawnFor(clients: Player[], id: AnyEntity) {
	assert(registeredIds.includes(id), `Cannot despawn entity of ID "${id}" because it has never been spawned`)

	if (clients.isEmpty()) return

	clients.forEach(client => despawnOnClient.fire(client, { serverId: id }))
	registeredIds.remove(registeredIds.indexOf(id))
}
