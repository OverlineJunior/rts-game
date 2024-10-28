import { AnyEntity, component } from "@rbxts/matter"

export const Replica = component<{ serverId: AnyEntity }>("Replica")
export type Replica = ReturnType<typeof Replica>

export const Renderable = component<{ model: Model }>("Renderable")
export type Renderable = ReturnType<typeof Renderable>

export const ServerPosition = component<{ value: Vector3 }>("ServerPosition")
export type ServerPosition = ReturnType<typeof ServerPosition>

export const Selected = component<{ highlight?: Highlight }>("Selected")
export type Selected = ReturnType<typeof Selected>

export const Selectable = component("Selectable")
export type Selectable = ReturnType<typeof Selectable>
