import { World } from "@rbxts/matter"
import { Workspace } from "@rbxts/services"
import { Renderable } from "game/client/components"
import { System } from "game/shared/bootstrap"
import { Unit } from "game/shared/components"

// TODO! Should clone the unit's prefab model based on its kind.
function getTemporaryModel(): Model {
	const model = new Instance("Model")
	model.Name = "unit"
	model.Parent = Workspace

	const body = new Instance("Part")
	body.Name = "body"
	body.Size = Vector3.one
	body.Anchored = true
	body.BrickColor = BrickColor.random()
	body.Material = Enum.Material.Neon
	body.Parent = model

	model.PrimaryPart = body

	return model
}

function renderUnit(world: World) {
	for (const [id] of world.query(Unit).without(Renderable)) {
		world.insert(id, Renderable({ model: getTemporaryModel() }))
	}
}

export = new System(renderUnit)
