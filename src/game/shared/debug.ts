import { TweenService, Workspace } from "@rbxts/services"

function getContainer(): Folder {
	const container = Workspace.FindFirstChild("debug") as Folder | undefined

	if (container) {
		return container
	} else {
		const c = new Instance("Folder")
		c.Name = "debug"
		c.Parent = Workspace

		return c
	}
}

export function point(pos: Vector3, lifetime: number = 0.1) {
	const p = new Instance("Part")
	p.Position = pos
	p.Anchored = true
	p.Size = Vector3.one.mul(0.5)
	p.Color = Color3.fromRGB(255, 255, 0)
	p.Parent = getContainer()

	TweenService
		.Create(p, new TweenInfo(lifetime), {  Transparency: 1 })
		.Play()

	task.delay(lifetime, () => {
		p.Destroy()
	})
}

export function circle(pos: Vector3, radius: number, lifetime: number = 0.1) {
	const p = new Instance("Part")
	p.Position = pos
	p.Shape = Enum.PartType.Cylinder
	p.Orientation = new Vector3(0, 0, 90)
	p.Anchored = true
	p.Size = new Vector3(0.1, radius, radius)
	p.Color = Color3.fromRGB(255, 255, 0)
	p.Parent = getContainer()

	TweenService
		.Create(p, new TweenInfo(lifetime), {  Transparency: 1 })
		.Play()

	task.delay(lifetime, () => {
		p.Destroy()
	})
}
