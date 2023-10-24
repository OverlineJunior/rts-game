import { World } from "@rbxts/matter"
import { Renderable } from "client/components"
import { Position } from "shared/components"

function moveRenderable(world: World) {
	for (const [id, posRec] of world.queryChanged(Position)) {
		if (!posRec.new) continue

		const render = world.get(id, Renderable)
		if (!render) continue

		render.model.PivotTo(new CFrame(posRec.new.value))
	}
}

export = moveRenderable
