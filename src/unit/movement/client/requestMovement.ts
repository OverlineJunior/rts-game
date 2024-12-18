import { AnyEntity, World } from "@rbxts/matter"
import { UserInputService } from "@rbxts/services"
import { Replica, Selected } from "game/client/components"
import { getMouseWorldPosition } from "game/shared/mouse"
import { requestMovement as reqMovement } from "game/client/network"
import { System } from "game/shared/bootstrap"
import { canRequestMovement } from "unit/shared/unitUtil"

const MOVE_BUTTON = Enum.UserInputType.MouseButton1
const INCREMENT_BUTTON = Enum.KeyCode.LeftShift
const MAX_HOLD_TIME = 0.1

function getServerId(world: World, unit: AnyEntity) {
	return world.contains(unit) ? world.get(unit, Replica)?.serverId : undefined
}

function getGoal(): Vector3 {
	return getMouseWorldPosition(1000)
}

function getSelected(world: World) {
	const selected = []

	for (const [id] of world.query(Selected)) {
		selected.push(id)
	}

	return selected
}

function requestMovement(world: World) {
	let pressTime: number | undefined

	UserInputService.InputBegan.Connect((input, ui) => {
		if (ui || input.UserInputType !== MOVE_BUTTON) return

		pressTime = tick()
	})

	UserInputService.InputEnded.Connect((input, ui) => {
		if (ui || input.UserInputType !== MOVE_BUTTON || !pressTime) return

		const elapsed = tick() - pressTime
		if (elapsed > MAX_HOLD_TIME) return
		pressTime = undefined

		const serverUnits = getSelected(world)
			.filter(id => canRequestMovement(id, world))
		    .mapFiltered(id => getServerId(world, id))

		if (serverUnits.isEmpty()) return

		const goal = getGoal()
		const increment = UserInputService.IsKeyDown(INCREMENT_BUTTON) ? true : false

		reqMovement.fire({ serverIds: serverUnits, x: goal.X, z: goal.Z, increment })
	})
}

export = new System(requestMovement, { type: "onStartup" })
