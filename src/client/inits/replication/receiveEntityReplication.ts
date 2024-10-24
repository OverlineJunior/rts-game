import { AnyEntity, World } from "@rbxts/matter"
import { deserializeComponents } from "shared/componentSerde"
import { despawnOnClient, spawnOnClient } from "shared/remotes"

const serverToClientId: Map<number, number> = new Map()

function receiveEntityReplication(world: World) {
	spawnOnClient.OnClientEvent.Connect((serverId, serializedComponents) => {
		const clientId = world.spawn(...deserializeComponents(serializedComponents))
		serverToClientId.set(serverId, clientId)
	})

	despawnOnClient.OnClientEvent.Connect(serverId => {
		const clientId = serverToClientId.get(serverId) as AnyEntity | undefined
		assert(clientId, `Could not find a client ID that matches the server ID of "${serverId}"`)

		serverToClientId.delete(serverId)

		if (world.contains(clientId)) {
			world.despawn(clientId)
		}
	})
}

export = receiveEntityReplication
