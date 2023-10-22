import { component } from "@rbxts/matter"

export const Renderable = component<{ model: Model }>("Renderable")
export type Renderable = ReturnType<typeof Renderable>
