import { World } from "@rbxts/matter"
import { Workspace } from "@rbxts/services"
import { Renderable } from "game/client/components"
import { System } from "game/shared/bootstrap"
import { Unit } from "game/shared/components"

const CONTAINER = new Instance("Folder")
CONTAINER.Name = "renders"
CONTAINER.Parent = Workspace

function parentRenderable(world: World) {
	for (const [id, render] of world.query(Renderable)) {
		if (render.model.Parent === CONTAINER) continue

		const clone = render.model.Clone()
		clone.Parent = CONTAINER

		world.insert(id, render.patch({ model: clone }))
	}
}

export = new System(parentRenderable, { priority: -math.huge })
