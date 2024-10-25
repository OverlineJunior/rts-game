import { AnyEntity, World } from "@rbxts/matter"
import { t } from "@rbxts/t"
import { System } from "game/shared/bootstrap"
import { Goal, Owner } from "game/shared/components"
import Queue from "game/shared/queue"
import { requestMovement } from "game/shared/remotes"
import { canRequestMovement } from "unit/shared/unitUtil"

function giveGoals(world: World) {
	requestMovement.OnServerEvent.Connect((sender, serverUnits, goal, increment) => {
		if (
			!t.array(t.number)(serverUnits)
			|| !t.Vector3(goal)
			|| !t.boolean(increment)
			|| serverUnits.isEmpty()
		) return

		(serverUnits as AnyEntity[])
			.filter(id => canRequestMovement(id, world) && world.get(id, Owner)?.player === sender)
			.forEach(id => {
				world.insert(id, Goal({
					queue: increment && world.get(id, Goal)
						? world.get(id, Goal)!.queue.enqueue(goal)
						: new Queue(goal)
				}))
			})
	})
}

export = new System(giveGoals, { type: "onStartup" })
