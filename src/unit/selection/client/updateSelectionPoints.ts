import { World } from "@rbxts/matter"
import { UserInputService } from "@rbxts/services";
import { ClientState } from "game/client/clientState";
import { System } from "game/shared/bootstrap";

const SELECT_BUTTON = Enum.UserInputType.MouseButton1

function updateSelectionPoints(_: World, { selection }: ClientState) {
	let thread: thread | undefined

	UserInputService.InputBegan.Connect((input, ui) => {
		if (ui || input.UserInputType !== SELECT_BUTTON) return

		const point = UserInputService.GetMouseLocation()
		thread = task.delay(0.1, () => selection.point1 = point)
	})

	UserInputService.InputChanged.Connect(input => {
		if (input.UserInputType !== Enum.UserInputType.MouseMovement) return

		selection.point2 = UserInputService.GetMouseLocation()
	})

	UserInputService.InputEnded.Connect((input, ui) => {
		if (ui || input.UserInputType !== SELECT_BUTTON) return

		if (thread) task.cancel(thread)

		selection.point1 = undefined
	})
}

export = new System(updateSelectionPoints, { type: "onStartup" })
