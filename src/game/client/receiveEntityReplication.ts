import { AnyEntity, World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { deserializeComponents } from "game/shared/componentSerde"
import { spawnOnClient, despawnOnClient } from "game/shared/remotes"
import { Replica } from "./components"

const serverToClientId: Map<number, number> = new Map()

function receiveEntityReplication(world: World) {
	spawnOnClient.OnClientEvent.Connect((serverId, serializedComponents) => {
		const clientId = world.spawn(Replica({ serverId }), ...deserializeComponents(serializedComponents))
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

export = new System(receiveEntityReplication, { type: "onStartup" })
