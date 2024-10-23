import { component } from "@rbxts/matter"

export const Unit = component("Unit")
export type Unit = ReturnType<typeof Unit>

export const Owner = component<{ player: Player }>("Owner")
export type Owner = ReturnType<typeof Owner>

export const Position = component<{ value: Vector3 }>("Position")
export type Position = ReturnType<typeof Position>

export const Speed = component<{ value: number }>("Speed")
export type Speed = ReturnType<typeof Speed>
