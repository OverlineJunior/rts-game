import { World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Orientation, Position } from "game/shared/components"

function updateOrientation(world: World) {
	for (const [id, pos] of world.queryChanged(Position)) {
		if (!world.contains(id) || !world.get(id, Orientation) || !pos.old || !pos.new) continue

		const from = pos.old.value
		const to = pos.new.value

		world.insert(id, Orientation({ value: CFrame.lookAt(from, to).Rotation }))
	}
}

export = new System(updateOrientation)
