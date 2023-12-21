import { World, useEvent } from "@rbxts/matter"
import { Players, UserInputService } from "@rbxts/services"
import { Owner, Unit } from "shared/components"

const CLIENT = Players.LocalPlayer
const M1 = Enum.UserInputType.MouseButton1
const LSHIFT = Enum.KeyCode.LeftShift

// Clears the goals on input and asks the server to do the same.
function sendClearGoals(world: World) {
	for (const [_, input, processed] of useEvent(UserInputService, "InputEnded")) {
		if (input.UserInputType !== M1 || UserInputService.IsKeyDown(LSHIFT) || processed) continue

		for (const [_, unit, owner] of world.query(Unit, Owner)) {
			if (owner.player !== CLIENT) continue

			unit.remotes.clearGoals.FireServer()
		}
	}
}

export = sendClearGoals
