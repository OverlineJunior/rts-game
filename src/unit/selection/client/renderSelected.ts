import { World } from "@rbxts/matter"
import { Renderable, Selected } from "game/client/components"
import { System } from "game/shared/bootstrap"

function renderSelected(world: World) {
	for (const [id, selected, render] of world.query(Selected, Renderable)) {
		if (selected.highlight) continue

		const highlight = new Instance("Highlight")
		highlight.FillTransparency = 1
		highlight.Parent = render.model

		world.insert(id, Selected({ highlight }))
	}

	for (const [_, selectedRec] of world.queryChanged(Selected)) {
		if (!selectedRec.old || selectedRec.new || !selectedRec.old.highlight ) continue

		selectedRec.old.highlight.Destroy()
	}
}

export = new System(renderSelected)
