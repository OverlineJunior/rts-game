import { World, } from "@rbxts/matter"
import { Players, Workspace } from "@rbxts/services"
import { ClientState } from "game/client/clientState"
import { Selectable, Selected } from "game/client/components"
import { System } from "game/shared/bootstrap"
import { Owner, Position } from "game/shared/components"
import { isWithinBounds, getBounds } from "game/shared/vector2"

const client = Players.LocalPlayer
const camera = Workspace.CurrentCamera

let lastPoint1: Vector2 | undefined

function selectInBounds(bounds: [Vector2, Vector2], world: World) {
	if (!camera) return

	for (const [id, pos] of world.query(Position, Selectable).without(Selected)) {
		const owner = world.get(id, Owner)?.player
		if (owner && owner !== client) continue

		const [screenPos, onScreen] = camera.WorldToViewportPoint(pos.value)

		if (onScreen && isWithinBounds(screenPos, bounds)) {
			world.insert(id, Selected({}))
		}
	}
}

function doSelection(world: World, { selection }: ClientState) {
	if (lastPoint1 && !selection.point1 && selection.point2) {
		selectInBounds(getBounds(lastPoint1, selection.point2), world)
	}

	lastPoint1 = selection.point1
}

export = new System(doSelection)
