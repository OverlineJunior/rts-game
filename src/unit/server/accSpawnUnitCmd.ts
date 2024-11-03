import { World } from "@rbxts/matter"
import { Replicated } from "game/server/components"
import { spawnUnitCmd } from "game/server/network"
import { System } from "game/shared/bootstrap"
import { Unit, Owner, Position, Speed, Velocity, Acceleration } from "game/shared/components"
import powerUsers from "game/shared/powerUsers"

function accSpawnUnitCmd(world: World) {
	spawnUnitCmd.on((client, { x, z }) => {
		if (!powerUsers.includes(client.UserId)) return

		world.spawn(
			Unit({}),
			Replicated({ finishedFor: [] }),
			Owner({ player: client }),
			Position({ value: new Vector3(x, 0.75 / 2, z) }),
			Speed({ value: 10 }),
			Velocity({ value: Vector3.zero }),
			Acceleration({ value: Vector3.zero }),
		)
	})
}

export = new System(accSpawnUnitCmd, { type: "onStartup" })
