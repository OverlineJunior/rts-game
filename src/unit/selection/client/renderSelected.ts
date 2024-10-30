import { World } from "@rbxts/matter"
import { Renderable, Selected } from "game/client/components"
import { System } from "game/shared/bootstrap"

const IMAGE_ID = "rbxassetid://12914395250"
const COLOR = Color3.fromRGB(255, 255, 255)
const TRANSPARENCY = 0.4
const SCALE = 2.4

function renderSelected(world: World) {
	for (const [id, selected, { model }] of world.query(Selected, Renderable)) {
		if (selected.part) continue

		const [_, modelSize] = model.GetBoundingBox()
		const avgWidth = (modelSize.X + modelSize.Z) / 2
		const partWidth = avgWidth * SCALE

		const part = new Instance("Part")
		part.Size = new Vector3(partWidth, 0.1, partWidth)
		part.Transparency = 1
		part.CFrame = model.PrimaryPart!.CFrame.sub(new Vector3(0, modelSize.Y / 2, 0))
		part.Parent = model

		const gui = new Instance("SurfaceGui")
		gui.Face = Enum.NormalId.Top
		gui.LightInfluence = 0
		gui.Brightness = 4
		gui.Parent = part

		const img = new Instance("ImageLabel")
		img.Image = IMAGE_ID
		img.ImageTransparency = TRANSPARENCY
		img.Size = UDim2.fromScale(1, 1)
		img.ImageColor3 = COLOR
		img.BackgroundTransparency = 1
		img.Parent = gui

		const weld = new Instance("WeldConstraint")
		weld.Part0 = part
		weld.Part1 = model.PrimaryPart!
		weld.Parent = part

		world.insert(id, Selected({ part }))
	}

	for (const [_, selectedRec] of world.queryChanged(Selected)) {
		if (!selectedRec.old || selectedRec.new || !selectedRec.old.part ) continue

		selectedRec.old.part.Destroy()
	}
}

export = new System(renderSelected)
