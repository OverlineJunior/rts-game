import { AnyEntity, World } from "@rbxts/matter"
import { t } from "@rbxts/t"
import { Mobilization } from "server/components"
import { demobilizeAll } from "server/components/mobilization"
import { Owner } from "shared/components"
import { canMobilize } from "shared/mobilization"
import { requestMobilization } from "shared/remotes"

function areUnitsValid(ids: AnyEntity[], sender: Player, world: World): boolean {
	return ids.every(id => {
		return world.contains(id)
			&& world.get(id, Owner)?.player === sender
			&& canMobilize(id, world)
	})
}

function mobilizeUnits(world: World) {
	requestMobilization.OnServerEvent.Connect((sender, serverUnitIds_, goal) => {
		if (!t.array(t.integer)(serverUnitIds_) || !t.Vector3(goal)) return
		const serverUnitIds = serverUnitIds_ as AnyEntity[]

		if (!areUnitsValid(serverUnitIds, sender, world)) return

		// Makes sure each unit can only be at a single mobilization at a time by removing them from any other mobilization.
		demobilizeAll(serverUnitIds, world)

		world.spawn(Mobilization({ units: serverUnitIds, goalQueue: [goal] }))
	})
}

export = mobilizeUnits
