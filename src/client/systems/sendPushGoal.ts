import { World, useEvent } from "@rbxts/matter"
import { Players, UserInputService } from "@rbxts/services"
import { Owner, Unit } from "shared/components"
import { getMouseWorldPosition } from "shared/mouse"
import inputClearGoals from "./sendClearGoals"

const CLIENT = Players.LocalPlayer
const M1 = Enum.UserInputType.MouseButton1

// Pushes a goal on input and asks the server to do the same.
function sendPushGoal(world: World) {
	for (const [_, input, processed] of useEvent(UserInputService, "InputEnded")) {
		if (input.UserInputType !== M1 || processed) continue

		const mousePos = getMouseWorldPosition(100)
		const goal = new Vector3(mousePos.X, 0, mousePos.Z)

		for (const [_, unit, owner] of world.query(Unit, Owner)) {
			if (owner.player !== CLIENT) continue

			unit.remotes.pushGoal.FireServer(goal)
		}
	}
}

export = {
	system: sendPushGoal,
	after: [inputClearGoals],
}
