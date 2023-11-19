import { component } from "@rbxts/matter"
import { Unit } from "./unit"

export const Position = component<{ value: Vector3 }>("Position")
export type Position = ReturnType<typeof Position>

export const Owner = component<{ player: Player }>("Owner")
export type Owner = ReturnType<typeof Owner>

export const Goals = component<{ queue: Array<Vector3> }>("Goals")
export type Goals = ReturnType<typeof Goals>

export const Speed = component<{ base: number }>("Speed")
export type Speed = ReturnType<typeof Speed>

export { Unit }
