import { AnyEntity, World } from "@rbxts/matter"
import { deserializeComponents } from "shared/componentSerde"
import remotes from "shared/remotes"

const spawnOnClient = remotes.Client.Get("spawnOnClient")
const despawnOnClient = remotes.Client.Get("despawnOnClient")

const serverToClientId: Map<number, number> = new Map()

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
