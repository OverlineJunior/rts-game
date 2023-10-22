import Net from "@rbxts/net"
import { SerializedComponents } from "./componentSerde"

const remotes = Net.Definitions.Create({
	spawnOnClient:
		Net.Definitions.ServerToClientEvent<[serverId: number, serializedComponents: SerializedComponents]>(),
	despawnOnClient: Net.Definitions.ServerToClientEvent<[serverId: number]>(),
})

export = remotes
