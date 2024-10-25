import { event } from "@rbxts/link"
import { AnyEntity } from "@rbxts/matter"
import { SerializedComponents } from "./componentSerde"

export const spawnOnClient = event<[serverId: AnyEntity, SerializedComponents]>()
export const despawnOnClient = event<[serverId: AnyEntity]>()
export const sendUnitPosition = event<[AnyEntity, Vector3]>()
export const requestMovement = event<[serverUnitIds: AnyEntity[], goal: Vector3, increment: boolean]>()
