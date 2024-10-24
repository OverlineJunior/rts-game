import { AnyEntity, World } from "@rbxts/matter"
import { t } from "@rbxts/t"
import { System } from "game/shared/bootstrap"
import { Owner, Squad, SquadMember } from "game/shared/components"
import Queue from "game/shared/queue"
import { requestSquad } from "game/shared/remotes"

function acceptSquadRequest(world: World) {
	requestSquad.OnServerEvent.Connect((sender, serverUnits, goal) => {
		if (!t.array(t.number)(serverUnits) || !t.Vector3(goal) || serverUnits.isEmpty()) return

		const squad = world.spawn(Squad({ goals: new Queue(goal) }));

		(serverUnits as AnyEntity[])
			.filter(id => world.contains(id) && world.get(id, Owner)?.player === sender)
			.forEach(id => {
				world.insert(id, SquadMember({ squad }))
			})
	})
}

export = new System(acceptSquadRequest, { type: "onStartup" })
