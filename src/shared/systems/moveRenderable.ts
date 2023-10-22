import { World } from "@rbxts/matter"
import { Renderable } from "client/components"
import { Position } from "shared/components"

function moveRenderable(world: World) {
	for (const [_, render, pos] of world.query(Renderable, Position)) {
		render.model.PivotTo(new CFrame(pos.value))
	}
}

export = moveRenderable
