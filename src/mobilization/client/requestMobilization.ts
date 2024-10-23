import { AnyEntity, World, useEvent } from "@rbxts/matter"
import { UserInputService } from "@rbxts/services"
import { ClientState } from "game/client/clientState"
import { Replica } from "game/client/components"
import { getMouseWorldPosition } from "game/shared/mouse"
import { canMobilize } from "mobilization/shared/mobilization"
import { requestMobilization as reqMobilization } from "game/shared/remotes"

const MOBILIZE_BUTTON = Enum.UserInputType.MouseButton1

// Selected units that are no longer valid or don't have Replica are discarded.
function getServerIds(world: World, units: AnyEntity[]): AnyEntity[] {
	return units
		.filter(id => world.contains(id))
		.mapFiltered(id => world.get(id, Replica)?.serverId)
}

function getGoal(): Vector3 {
	return getMouseWorldPosition(100)
}

function requestMobilization(world: World, state: ClientState) {
	for (const [_, input, ui] of useEvent(UserInputService, "InputBegan")) {
		if (ui || input.UserInputType !== MOBILIZE_BUTTON) continue
		const mobilizables = state.selection.units.filter(id => canMobilize(id, world))
		const serverUnitIds = getServerIds(world, mobilizables)
		if (serverUnitIds.isEmpty()) continue

		reqMobilization.FireServer(serverUnitIds, getGoal())
	}
}

export = requestMobilization
