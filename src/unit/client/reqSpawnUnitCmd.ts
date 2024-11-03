import { Players, UserInputService } from "@rbxts/services"
import { spawnUnitCmd } from "game/client/network"
import { System } from "game/shared/bootstrap"
import { getMouseWorldPosition } from "game/shared/mouse"

const SPAWN_BUTTON = Enum.KeyCode.U
const ALLOWED_PLAYER_IDS = [93428451]

const client = Players.LocalPlayer

function reqSpawnUnitCmd() {
	if (!ALLOWED_PLAYER_IDS.includes(client.UserId)) return

	UserInputService.InputEnded.Connect((input, ui) => {
		if (ui || input.KeyCode !== SPAWN_BUTTON) return

		const pos = getMouseWorldPosition(500)
		spawnUnitCmd.fire({ x: pos.X, z: pos.Z })
	})
}

export = new System(reqSpawnUnitCmd, { type: "onStartup" })
