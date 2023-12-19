import { World, useEvent } from "@rbxts/matter"
import { Players, UserInputService } from "@rbxts/services"
import { Goals, Owner, Unit } from "shared/components"

const CLIENT = Players.LocalPlayer
const M1 = Enum.UserInputType.MouseButton1
const LSHIFT = Enum.KeyCode.LeftShift

// Clears the goals on input and asks the server to do the same.
function inputClearGoals(world: World) {
	for (const [_, input, processed] of useEvent(UserInputService, "InputEnded")) {
		if (input.UserInputType !== M1 || UserInputService.IsKeyDown(LSHIFT) || processed) continue

		for (const [id, unit, owner, goals] of world.query(Unit, Owner, Goals)) {
			if (owner.player !== CLIENT) continue

			world.insert(
				id,
				goals.patch({
					queue: [],
				}),
			)

			unit.remotes.clearGoals.FireServer()
		}
	}
}

export = inputClearGoals
