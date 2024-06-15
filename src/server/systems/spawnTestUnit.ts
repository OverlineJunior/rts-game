import { World, useEvent } from "@rbxts/matter"
import { Players } from "@rbxts/services"
import { Replicated } from "server/components"
import { Owner, Position, Speed, Unit } from "shared/components"

function spawnTestUnit(world: World) {
	for (const [_, player] of useEvent(Players, "PlayerAdded")) {
		world.spawn(
			Unit({}),
			Replicated({ finishedFor: [] }),
			Owner({ player }),
			Position({ value: Vector3.zero }),
			Speed({ value: 10 }),
		)
	}
}

export = spawnTestUnit
