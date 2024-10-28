import { World } from "@rbxts/matter"
import { UserInputService } from "@rbxts/services"
import { Selected } from "game/client/components"
import { System } from "game/shared/bootstrap"

const DESELECT_BUTTON = Enum.KeyCode.E

function deselectAll(world: World) {
	UserInputService.InputBegan.Connect((input, ui) => {
		if (ui || input.KeyCode !== DESELECT_BUTTON) return

		for (const [id] of world.query(Selected)) {
			world.remove(id, Selected)
		}
	})
}

export = new System(deselectAll, { type: "onStartup" })
