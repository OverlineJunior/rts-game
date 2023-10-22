import { AnyComponent } from "@rbxts/matter/lib/component"
import remotes from "shared/remotes"

const spawnOnClient = remotes.Server.Get("spawnOnClient")
const despawnOnClient = remotes.Server.Get("despawnOnClient")

let serverId = 1

function getComponentName(comp: AnyComponent) {
	return tostring(getmetatable(comp))
}

function serializeComponents(comps: Array<AnyComponent>) {
	const ser: Map<string, AnyComponent> = new Map()
	comps.forEach((c) => ser.set(getComponentName(c), c))

	return ser
}

/**
 * Spawns a new entity in each of the clients' worlds with the given components.
 * Note that the components must be either shared or client-sided, otherwise they'll be ignored.
 * @param clients The clients which the entity will be spawned for.
 * @param components The components to spawn the entity with.
 * @return The new entity ID.
 */
export function spawnFor(clients: Array<Player>, components: Array<AnyComponent>): number {
	spawnOnClient.SendToPlayers(clients, serverId, serializeComponents(components))

	return serverId++
}

/**
 * Removes the entity in each of the clients' worlds.
 * @param clients The clients which the entity will be despawned for.
 * @param id The entity's ID.
 */
export function despawnFor(clients: Array<Player>, id: number) {
	despawnOnClient.SendToPlayers(clients, id)
}
