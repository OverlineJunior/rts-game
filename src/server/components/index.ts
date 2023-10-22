import { component } from "@rbxts/matter"

export const Replicated = component<{ finishedFor: Array<Player> }>("Replicated")
export type Replicated = ReturnType<typeof Replicated>
