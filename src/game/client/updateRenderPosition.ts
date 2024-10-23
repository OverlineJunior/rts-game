import { World } from "@rbxts/matter"
import { Position } from "game/shared/components"
import { Renderable } from "./components"
import { System } from "game/shared/bootstrap"

function updateRenderPosition(world: World) {
	for (const [id, posRec] of world.queryChanged(Position)) {
		if (!posRec.new || !world.get(id, Renderable)) continue

		const model = world.get(id, Renderable)!.model
		const newCf = new CFrame(posRec.new.value)
		model.PivotTo(newCf)
	}
}

export = new System(updateRenderPosition)
