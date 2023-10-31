import { World } from "@rbxts/matter"
import { Workspace } from "@rbxts/services"
import { Renderable } from "client/components"
import { Unit } from "shared/components"
import { makeUnitModel } from "shared/components/unit"

function renderUnit(world: World) {
	for (const [id, unit] of world.query(Unit).without(Renderable)) {
		const model = makeUnitModel(unit.kind).Clone()
		model.Parent = Workspace

		world.insert(
			id,
			Renderable({
				model,
			}),
		)
	}
}

export = renderUnit
