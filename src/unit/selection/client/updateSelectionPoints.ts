import { World } from "@rbxts/matter"
import { UserInputService } from "@rbxts/services";
import { ClientState } from "game/client/clientState";
import { System } from "game/shared/bootstrap";

const SELECT_BUTTON = Enum.UserInputType.MouseButton1

function updateSelectionPoints(_: World, { selection }: ClientState) {
	UserInputService.InputBegan.Connect((input, ui) => {
		if (ui || input.UserInputType !== SELECT_BUTTON) return

		selection.point1 = UserInputService.GetMouseLocation()
	})

	UserInputService.InputChanged.Connect(input => {
		if (input.UserInputType !== Enum.UserInputType.MouseMovement) return

		selection.point2 = UserInputService.GetMouseLocation()
	})

	UserInputService.InputEnded.Connect((input, ui) => {
		if (ui || input.UserInputType !== SELECT_BUTTON || !selection.point1) return

		selection.point1 = undefined
	})
}

export = new System(updateSelectionPoints, { type: "onStartup" })
