import { World } from "@rbxts/matter"
import { Replicated } from "game/server/components"
import { spawnUnitCmd } from "game/server/network"
import { System } from "game/shared/bootstrap"
import { Unit, Owner, Position, Speed, Velocity, Acceleration } from "game/shared/components"
import powerUsers from "game/shared/powerUsers"
import { unitBundle } from "./unitUtil"
import { basic } from "unit/shared/unitData"

function accSpawnUnitCmd(world: World) {
	spawnUnitCmd.on((client, { x, z }) => {
		if (!powerUsers.includes(client.UserId)) return

		world.spawn(...unitBundle(client, x, z, basic))
	})
}

export = new System(accSpawnUnitCmd, { type: "onStartup" })
