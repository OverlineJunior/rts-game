import { AnyEntity, component } from "@rbxts/matter"

export const Replica = component<{ serverId: AnyEntity }>("Replica")
export type Replica = ReturnType<typeof Replica>

export const Renderable = component<{ model: Model }>("Renderable")
export type Renderable = ReturnType<typeof Renderable>

export const Goal = component<{ value: Vector3 }>("Goal")
export type Goal = ReturnType<typeof Goal>
