import { Players, UserInputService } from "@rbxts/services"
import { spawnUnitCmd } from "game/client/network"
import { System } from "game/shared/bootstrap"
import { getMouseWorldPosition } from "game/shared/mouse"
import powerUsers from "game/shared/powerUsers"

const SPAWN_BUTTON = Enum.KeyCode.U

const client = Players.LocalPlayer

function reqSpawnUnitCmd() {
	if (!powerUsers.includes(client.UserId)) return

	UserInputService.InputEnded.Connect((input, ui) => {
		if (ui || input.KeyCode !== SPAWN_BUTTON) return

		const pos = getMouseWorldPosition(500)
		spawnUnitCmd.fire({ x: pos.X, z: pos.Z })
	})
}

export = new System(reqSpawnUnitCmd, { type: "onStartup" })
