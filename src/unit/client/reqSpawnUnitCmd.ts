import { Players, UserInputService } from "@rbxts/services"
import { spawnUnitCmd } from "game/client/network"
import { System } from "game/shared/bootstrap"
import { getMouseWorldPosition } from "game/shared/mouse"
import powerUsers from "game/shared/powerUsers"

const SPAWN_BUTTON = Enum.KeyCode.U

const client = Players.LocalPlayer

function reqSpawnUnitCmd() {
	if (!powerUsers.includes(client.UserId)) return

	let running = false

	UserInputService.InputBegan.Connect((input, ui) => {
		if (ui || input.KeyCode !== SPAWN_BUTTON) return

		let interval = 0.5
		running = true

		while (running) {
			const pos = getMouseWorldPosition(500)
			spawnUnitCmd.fire({ x: pos.X, z: pos.Z })
			task.wait(interval)
			interval = math.max(interval - 0.05, 0.05)
		}
	})

	UserInputService.InputEnded.Connect((input, ui) => {
		if (input.KeyCode !== SPAWN_BUTTON) return

		running = false
	})
}

export = new System(reqSpawnUnitCmd, { type: "onStartup" })
