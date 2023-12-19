import { World } from "@rbxts/matter"
import { Renderable } from "client/components"

// Model is destroyed when Renderable is removed.
function destroyRenderable(world: World) {
	for (const [_, renderRec] of world.queryChanged(Renderable)) {
		if (!renderRec.old || renderRec.new) continue

		renderRec.old.model.Destroy()
	}
}

export = destroyRenderable
