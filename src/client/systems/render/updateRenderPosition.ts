import { World } from "@rbxts/matter"
import { Renderable } from "client/components"
import { Position } from "shared/components"

function updateRenderPosition(world: World) {
	for (const [id, posRec] of world.queryChanged(Position)) {
		if (!posRec.new || !world.get(id, Renderable)) continue

		const model = world.get(id, Renderable)!.model
		const newCf = new CFrame(posRec.new.value)
		model.PivotTo(newCf)
	}
}

export = updateRenderPosition
