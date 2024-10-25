import { AnyEntity, World, useEvent } from "@rbxts/matter"
import { UserInputService } from "@rbxts/services"
import { ClientState } from "game/client/clientState"
import { Replica } from "game/client/components"
import { getMouseWorldPosition } from "game/shared/mouse"
import { requestMovement as reqMovement } from "game/shared/remotes"
import { System } from "game/shared/bootstrap"
import { canRequestMovement } from "unit/shared/unitUtil"

const MOVE_BUTTON = Enum.UserInputType.MouseButton1
const INCREMENT_BUTTON = Enum.KeyCode.LeftShift

function getServerId(world: World, unit: AnyEntity) {
	return world.contains(unit) ? world.get(unit, Replica)?.serverId : undefined
}

function getGoal(): Vector3 {
	return getMouseWorldPosition(100)
}

function requestMovement(world: World, state: ClientState) {
	for (const [_, input, ui] of useEvent(UserInputService, "InputBegan")) {
		if (ui || input.UserInputType !== MOVE_BUTTON) continue

		const serverUnits = state.selection.units
			.filter(id => canRequestMovement(id, world))
		    .mapFiltered(id => getServerId(world, id))

		if (serverUnits.isEmpty()) continue

		const goal = getGoal()
		const increment = UserInputService.IsKeyDown(INCREMENT_BUTTON) ? true : false

		reqMovement.FireServer(serverUnits, goal, increment)
	}
}

export = new System(requestMovement)
