import { World, useEvent } from "@rbxts/matter"
import { Players, UserInputService } from "@rbxts/services"
import { Goals, Owner, Unit } from "shared/components"
import { getMouseWorldPosition } from "shared/mouse"

const CLIENT = Players.LocalPlayer
const M1 = Enum.UserInputType.MouseButton1

function inputGoalPush(world: World) {
	for (const [_, input, processed] of useEvent(UserInputService, "InputEnded")) {
		if (input.UserInputType !== M1 || processed) continue

		const mousePos = getMouseWorldPosition(100)
		const goal = new Vector3(mousePos.X, 0, mousePos.Z)

		for (const [id, unit, owner, goals] of world.query(Unit, Owner, Goals)) {
			if (owner.player !== CLIENT) continue

			const newQueue = [...goals.queue]
			newQueue.push(goal as Vector3)

			world.insert(
				id,
				goals.patch({
					queue: newQueue,
				}),
			)

			unit.remotes.pushGoal.FireServer(goal)
		}
	}
}

export = inputGoalPush
