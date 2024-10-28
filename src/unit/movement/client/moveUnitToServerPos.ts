import { World } from "@rbxts/matter"
import { ServerPosition } from "game/client/components"
import { System } from "game/shared/bootstrap"
import { Position, Speed } from "game/shared/components"

function moveUnitToServerPos(world: World) {
	for (const [id, pos, serverPos] of world.query(Position, ServerPosition, Speed)) {
		// TODO! Implement a proper interpolation system for smooth movements.
		world.insert(id, pos.patch({ value: serverPos.value }))
	}
}

export = new System(moveUnitToServerPos)
