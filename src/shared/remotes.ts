import { AnyComponent } from "@rbxts/matter"
import Net from "@rbxts/net"

const remotes = Net.Definitions.Create({
	spawnOnClient:
		Net.Definitions.ServerToClientEvent<[serverId: number, serializedComponents: Map<string, AnyComponent>]>(),
	despawnOnClient: Net.Definitions.ServerToClientEvent<[serverId: number]>(),
})

export = remotes
