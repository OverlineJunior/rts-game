import { World } from "@rbxts/matter"
import { Workspace } from "@rbxts/services"
import { Renderable } from "game/client/components"
import { System } from "game/shared/bootstrap"
import { Unit } from "game/shared/components"

const RNG = new Random()

// TODO! Should clone the unit's prefab model based on its kind.
function getTemporaryModel(): Model {
	const model = new Instance("Model")
	model.Name = "unit"
	model.Parent = Workspace

	const body = new Instance("Part")
	body.Name = "body"
	body.Size = new Vector3(0.75, 0.75, 0.75)
	body.Anchored = true
	body.BrickColor = BrickColor.random()
	body.Material = Enum.Material.SmoothPlastic
	body.CanCollide = false
	body.CanTouch = false
	body.CanQuery = false
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
