import { component } from "@rbxts/matter"
import { Mobilization } from "./mobilization"

export const Replicated = component<{ finishedFor: Player[] }>("Replicated")
export type Replicated = ReturnType<typeof Replicated>

export { Mobilization }
