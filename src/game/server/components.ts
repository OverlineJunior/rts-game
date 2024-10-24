import { component } from "@rbxts/matter"

export const Replicated = component<{ finishedFor: Player[] }>("Replicated")
export type Replicated = ReturnType<typeof Replicated>
