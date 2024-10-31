import { World } from "@rbxts/matter"
import { ClientState } from "game/client/clientState"
import { System } from "game/shared/bootstrap"
import { getBounds } from "game/shared/vector2"

function drawSelection(_: World, { selection: { point1, point2, frame } }: ClientState) {
	if (!frame) return

	if (point1 && point2) {
		const [min, max] = getBounds(point1, point2)
		frame.Position = UDim2.fromOffset(min.X, min.Y)
		frame.Size = UDim2.fromOffset(max.X - min.X, max.Y - min.Y)
		frame.Visible = true
	} else {
		frame.Visible = false
	}
}

export = new System(drawSelection)
