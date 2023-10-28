import { World, useEvent } from "@rbxts/matter"
import { Players, UserInputService } from "@rbxts/services"
import { GoalPositions, Owner, Unit } from "shared/components"
import { getMouseWorldPosition } from "shared/mouse"

const CLIENT = Players.LocalPlayer
const M1 = Enum.UserInputType.MouseButton1
const LSHIFT = Enum.KeyCode.LeftShift

function inputGoal(world: World) {
	for (const [_, input, processed] of useEvent(UserInputService, "InputEnded")) {
		if (input.UserInputType !== M1 || processed) continue

		const mousePos = getMouseWorldPosition(100)
		const goalPos = new Vector3(mousePos.X, 0, mousePos.Z)
		const clearGoals = !UserInputService.IsKeyDown(LSHIFT)

		for (const [_, unit, owner] of world.query(Unit, Owner, GoalPositions)) {
			if (owner.player !== CLIENT) continue

			unit.remotes.sendGoalPosition.FireServer(goalPos, clearGoals)
		}
	}
}

export = inputGoal
