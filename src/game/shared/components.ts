import { component } from "@rbxts/matter"
import Queue from "./queue"

export const Unit = component("Unit")
export type Unit = ReturnType<typeof Unit>

export const Owner = component<{ player: Player }>("Owner")
export type Owner = ReturnType<typeof Owner>

export const Position = component<{ value: Vector3 }>("Position")
export type Position = ReturnType<typeof Position>

export const Speed = component<{ value: number }>("Speed")
export type Speed = ReturnType<typeof Speed>

export const Goal = component<{ queue: Queue<Vector3> }>("Goal")
export type Goal = ReturnType<typeof Goal>

export const Velocity = component<{ value: Vector3 }>("Velocity")
export type Velocity = ReturnType<typeof Velocity>

export const Acceleration = component<{ value: Vector3 }>("Acceleration")
export type Acceleration = ReturnType<typeof Acceleration>
