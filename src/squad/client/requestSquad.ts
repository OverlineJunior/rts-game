import { AnyEntity, World, useEvent } from "@rbxts/matter"
import { UserInputService } from "@rbxts/services"
import { ClientState } from "game/client/clientState"
import { Replica } from "game/client/components"
import { getMouseWorldPosition } from "game/shared/mouse"
import { requestSquad as reqSquad } from "game/shared/remotes"
import { System } from "game/shared/bootstrap"
import { canBeInSquad } from "squad/shared/squadUtil"

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

function requestSquad(world: World, state: ClientState) {
	for (const [_, input, ui] of useEvent(UserInputService, "InputBegan")) {
		if (ui || input.UserInputType !== MOBILIZE_BUTTON) continue
		const validUnits = state.selection.units.filter(id => canBeInSquad(id, world))
		const serverUnitIds = getServerIds(world, validUnits)
		if (serverUnitIds.isEmpty()) continue

		reqSquad.FireServer(serverUnitIds, getGoal())
	}
}

export = new System(requestSquad)
