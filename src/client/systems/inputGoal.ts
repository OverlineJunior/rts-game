import { World, useEvent } from "@rbxts/matter"
import { Players, UserInputService } from "@rbxts/services"
import { GoalPositions, Owner, Unit } from "shared/components"

const CLIENT = Players.LocalPlayer
const M1 = Enum.UserInputType.MouseButton1
const LSHIFT = Enum.KeyCode.LeftShift

function inputGoal(world: World) {
	for (const [_, input, processed] of useEvent(UserInputService, "InputEnded")) {
		if (input.UserInputType !== M1 || processed) continue

		// ! Temporary. Get mouse's world position.
		const goalPosition = new Vector3(math.random(-50, 50), 0, math.random(-50, 50))
		const clearGoals = !UserInputService.IsKeyDown(LSHIFT)

		for (const [_, unit, owner] of world.query(Unit, Owner, GoalPositions)) {
			if (owner.player !== CLIENT) continue

			unit.remotes.sendGoalPosition.FireServer(goalPosition, clearGoals)
		}
	}
}

export = inputGoal
