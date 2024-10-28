import { World } from "@rbxts/matter"
import { Players } from "@rbxts/services";
import { ClientState } from "game/client/clientState";
import { System } from "game/shared/bootstrap";

const client = Players.LocalPlayer

function updateSelectionFrame(_: World, { selection }: ClientState) {
	client.CharacterAdded.Connect(() => {
		let screen = new Instance("ScreenGui")
		screen.Name = "Selection"
		screen.IgnoreGuiInset = true
		screen.Parent = client.WaitForChild("PlayerGui")

		let frame = new Instance("Frame")
		frame.Transparency = 0.8
		frame.BackgroundColor3 = new Color3(0, 0, 0)
		frame.BorderColor3 = new Color3(1, 1, 1)
		frame.BorderSizePixel = 1
		frame.Parent = screen

		selection.frame = frame
	})
}

export = new System(updateSelectionFrame, { type: "onStartup" })
