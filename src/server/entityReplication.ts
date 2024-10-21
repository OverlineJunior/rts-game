<<<<<<< HEAD
import { AnyComponent } from "@rbxts/matter/lib/component"
import { serializeComponents } from "shared/componentSerde"
import remotes from "shared/remotes"

const spawnOnClient = remotes.Server.Get("spawnOnClient")
const despawnOnClient = remotes.Server.Get("despawnOnClient")
=======
import { AnyEntity } from "@rbxts/matter"
import { AnyComponent } from "@rbxts/matter/lib/component"
import { serializeComponents } from "shared/componentSerde"
import { despawnOnClient, spawnOnClient } from "shared/remotes"
>>>>>>> remake

const registeredIds: Array<number> = new Array()

/**
 * Spawns a new entity in each of the clients' worlds with the given components.
 * Note that the components must be either shared or client-sided, otherwise they'll be ignored.
 * @param clients The clients which the entity will be spawned for.
 * @param id The discriminator used for despawning the spawned entity later on.
 * @param components The components to spawn the entity with.
 */
<<<<<<< HEAD
export function spawnFor(clients: Array<Player>, id: number, components: Array<AnyComponent>) {
	spawnOnClient.SendToPlayers(clients, id, serializeComponents(components))
=======
export function spawnFor(clients: Player[], id: AnyEntity, ...components: Array<AnyComponent>) {
	if (clients.isEmpty()) return

	clients.forEach(client => spawnOnClient.FireClient(client, id, serializeComponents(components)))
>>>>>>> remake
	registeredIds.push(id)
}

/**
 * Removes the entity in each of the clients' worlds.
 * @param clients The clients which the entity will be despawned for.
 * @param id The entity's discriminator.
 */
<<<<<<< HEAD
export function despawnFor(clients: Array<Player>, id: number) {
	assert(registeredIds.includes(id), `Cannot despawn entity of ID "${id}" because it has never been spawned`)

	despawnOnClient.SendToPlayers(clients, id)
=======
export function despawnFor(clients: Player[], id: AnyEntity) {
	assert(registeredIds.includes(id), `Cannot despawn entity of ID "${id}" because it has never been spawned`)

	if (clients.isEmpty()) return

	clients.forEach(client => despawnOnClient.FireClient(client, id))
	registeredIds.remove(registeredIds.indexOf(id))
>>>>>>> remake
}
