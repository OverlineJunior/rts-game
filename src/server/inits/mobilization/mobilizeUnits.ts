import { AnyEntity, World } from "@rbxts/matter"
import { t } from "@rbxts/t"
import { spawnMobilization } from "server/components/mobilization"
import { Owner } from "shared/components"
import { canMobilize } from "shared/mobilization"
import { requestMobilization } from "shared/remotes"

function areUnitsValid(ids: AnyEntity[], sender: Player, world: World): boolean {
	return !ids.isEmpty() && ids.every(id => {
		return world.contains(id)
			&& world.get(id, Owner)?.player === sender
			&& canMobilize(id, world)
	})
}

function mobilizeUnits(world: World) {
	requestMobilization.OnServerEvent.Connect((sender, serverUnitIds_, goal) => {
		if (!t.array(t.integer)(serverUnitIds_) || !t.Vector3(goal)) return
		const serverUnitIds = serverUnitIds_ as [AnyEntity]

		if (!areUnitsValid(serverUnitIds, sender, world)) return

		spawnMobilization(serverUnitIds, goal, world)
	})
}

export = mobilizeUnits
