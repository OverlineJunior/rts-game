import { event } from "@rbxts/link"
import { AnyEntity } from "@rbxts/matter"
import { SerializedComponents } from "./componentSerde"

export const spawnOnClient = event<[serverId: AnyEntity, SerializedComponents]>()
export const despawnOnClient = event<[serverId: AnyEntity]>()
export const sendUnitPositions = event<[Map<AnyEntity, Vector3>]>()
export const requestMobilization = event<[serverUnitIds: AnyEntity[], goal: Vector3]>()
