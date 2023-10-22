import { component } from "@rbxts/matter"

export const Unit = component("Unit")
export type Unit = ReturnType<typeof Unit>

export const Position = component<{ value: Vector3 }>("Position")
export type Position = ReturnType<typeof Position>

export const Owner = component<{ player: Player }>("Owner")
export type Owner = ReturnType<typeof Owner>
