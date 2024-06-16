import { AnyEntity, World, useEvent } from "@rbxts/matter"
import { UserInputService } from "@rbxts/services"
import { ClientState } from "client/clientState"
import { Replica } from "client/components"
import { canMobilize } from "shared/mobilization"
import { requestMobilization as reqMobilization } from "shared/remotes"

const M2 = Enum.UserInputType.MouseButton2

// Selected units that are no longer valid or don't have Replica are discarded.
function getServerIds(world: World, units: AnyEntity[]): AnyEntity[] {
	return units
		.filter(id => world.contains(id))
		.mapFiltered(id => world.get(id, Replica)?.serverId)
}

// TODO! Send actual mouse position as the goal.
function getGoal(): Vector3 {
	return new Vector3(math.random(-100, 100), 0, math.random(-100, 100))
}

function requestMobilization(world: World, state: ClientState) {
	for (const [_, input, ui] of useEvent(UserInputService, "InputBegan")) {
		if (ui || input.UserInputType !== M2) continue

		const mobilizables = state.selection.units.filter(id => canMobilize(id, world))
		const serverUnitIds = getServerIds(world, mobilizables)
		if (serverUnitIds.isEmpty()) continue

		reqMobilization.FireServer(serverUnitIds, getGoal())
	}
}

export = requestMobilization
