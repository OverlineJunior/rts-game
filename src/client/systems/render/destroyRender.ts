import { World } from "@rbxts/matter"
import { Renderable } from "client/components"

function destroyRender(world: World) {
	for (const [_, renderRec] of world.queryChanged(Renderable)) {
		if (!renderRec.old || renderRec.new) continue

		renderRec.old.model.Destroy()
	}
}

export = destroyRender
