import { AnyComponent, AnyEntity, World } from "@rbxts/matter"
import remotes from "shared/remotes"
import * as ClientComponents from "client/components"
import * as SharedComponents from "shared/components"

const spawnOnClient = remotes.Client.Get("spawnOnClient")
const despawnOnClient = remotes.Client.Get("despawnOnClient")

const serverToClientId: Map<number, number> = new Map()

function findComponentCtor(name: string) {
	const clientCtors = { ...ClientComponents, ...SharedComponents }

	for (const [n, ctor] of pairs(clientCtors)) {
		if (n === name) {
			return ctor as (data: AnyComponent) => AnyComponent
		}
	}
}

function deserializeComponents(serializedComps: Map<string, AnyComponent>) {
	const comps: Array<AnyComponent> = new Array()

	serializedComps.forEach((data, name) => {
		const ctor = findComponentCtor(name)
		assert(
			ctor,
			`Could not find a component named "${name}" on either of the client or shared sides. This is likely a bug`,
		)

		comps.push(ctor(data))
	})

	return comps
}

function receiveEntityReplication(world: World) {
	spawnOnClient.Connect((serverId, serializedComps) => {
		const clientId = world.spawn(...deserializeComponents(serializedComps))
		serverToClientId.set(serverId, clientId)
	})

	despawnOnClient.Connect((serverId) => {
		const clientId = serverToClientId.get(serverId) as AnyEntity | undefined
		assert(clientId, `Could not find a client ID that matches the server ID of "${serverId}". This is likely a bug`)

		serverToClientId.delete(serverId)

		if (world.contains(clientId)) {
			world.despawn(clientId)
		}
	})
}

export = receiveEntityReplication
