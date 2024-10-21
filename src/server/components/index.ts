import { component } from "@rbxts/matter"
<<<<<<< HEAD

export const Replicated = component<{ finishedFor: Array<Player> }>("Replicated")
export type Replicated = ReturnType<typeof Replicated>
=======
import { Mobilization } from "./mobilization"

export const Replicated = component<{ finishedFor: Player[] }>("Replicated")
export type Replicated = ReturnType<typeof Replicated>

export { Mobilization }
>>>>>>> remake
