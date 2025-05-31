import { World } from "@rbxts/matter"
import { ServerState } from "game/server/serverState"
import { System } from "game/shared/bootstrap"
import { Position, Unit } from "game/shared/components"

function snapToGround(world: World, { heightmap }: ServerState) {
	for (const [id, pos] of world.query(Position, Unit)) {
		world.insert(id, pos.patch({
			value: new Vector3(
				pos.value.X,
				heightmap.get(pos.value)!.height + 0.625,
				pos.value.Z,
			),
		}))
	}
}

export = new System(snapToGround)
