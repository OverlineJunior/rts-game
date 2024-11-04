import { AnyEntity, World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { deserializeComponents, SerializedComponents } from "game/shared/componentSerde"
import { spawnOnClient, despawnOnClient } from "game/client/network"
import { Replica } from "./components"

const serverToClientId: Map<number, number> = new Map()

function receiveEntityReplication(world: World) {
	spawnOnClient.on(packet => {
		const serverId = packet.serverId as AnyEntity
		const serializedComponents = packet.serializedComponents as SerializedComponents

		const clientId = world.spawn(Replica({ serverId }), ...deserializeComponents(serializedComponents))
		serverToClientId.set(serverId, clientId)
	})

	despawnOnClient.on(packet => {
		const serverId = packet.serverId as number

		const clientId = serverToClientId.get(serverId) as AnyEntity | undefined
		assert(clientId, `Could not find a client ID that matches the server ID of "${serverId}"`)

		serverToClientId.delete(serverId)

		if (world.contains(clientId)) {
			world.despawn(clientId)
		}
	})
}

export = new System(receiveEntityReplication, { type: "onStartup" })
