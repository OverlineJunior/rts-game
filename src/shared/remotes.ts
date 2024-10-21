<<<<<<< HEAD
import Net from "@rbxts/net"
import { SerializedComponents } from "./componentSerde"

const remotes = Net.Definitions.Create({
	spawnOnClient:
		Net.Definitions.ServerToClientEvent<[serverId: number, serializedComponents: SerializedComponents]>(),
	despawnOnClient: Net.Definitions.ServerToClientEvent<[serverId: number]>(),
})

export = remotes
=======
import { event } from "@rbxts/link"
import { AnyEntity } from "@rbxts/matter"
import { SerializedComponents } from "./componentSerde"

export const spawnOnClient = event<[serverId: AnyEntity, SerializedComponents]>()
export const despawnOnClient = event<[serverId: AnyEntity]>()
export const sendUnitPosition = event<[AnyEntity, Vector3]>()
export const requestMobilization = event<[serverUnitIds: AnyEntity[], goal: Vector3]>()
>>>>>>> remake
