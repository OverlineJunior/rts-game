import { World, useEvent } from "@rbxts/matter"
import { Players } from "@rbxts/services"
import { Replicated } from "game/server/components"
import { System } from "game/shared/bootstrap"
import { Unit, Owner, Position, Speed } from "game/shared/components"

function spawnTestUnit(world: World) {
	for (const [_, player] of useEvent(Players, "PlayerAdded")) {
		for (let i = 0; i < 100; i++) {
			world.spawn(
				Unit({}),
				Replicated({ finishedFor: [] }),
				Owner({ player }),
				Position({ value: Vector3.zero }),
				Speed({ value: 10 }),
			)
		}
	}
}

export = new System(spawnTestUnit)
