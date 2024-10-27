import { World, useEvent } from "@rbxts/matter"
import { Players } from "@rbxts/services"
import { Replicated } from "game/server/components"
import { System } from "game/shared/bootstrap"
import { Unit, Owner, Position, Speed, Velocity, Acceleration } from "game/shared/components"

function spawnTestUnit(world: World) {
	for (const [_, player] of useEvent(Players, "PlayerAdded")) {
		for (let i = 0; i < 50; i++) {
			const pos = new Vector3(
				math.random(-5, 5),
				0,
				math.random(-5, 5),
			)

			world.spawn(
				Unit({}),
				Replicated({ finishedFor: [] }),
				Owner({ player }),
				Position({ value: pos }),
				Speed({ value: 10 }),
				Velocity({ value: Vector3.zero }),
				Acceleration({ value: Vector3.zero }),
			)
		}
	}
}

export = new System(spawnTestUnit)
