import { World } from "@rbxts/matter"
import { ServerState } from "game/server/serverState";
import { System } from "game/shared/bootstrap";
import { Position, Unit } from "game/shared/components";

function updateUnitGrid(world: World, { unitGrid }: ServerState) {
	for (const [unit, pos] of world.queryChanged(Position)) {
		if (!world.contains(unit) || !world.get(unit, Unit)) continue

		const oldPos = pos.old?.value
		if (oldPos) {
			unitGrid.remove(unit, oldPos.X, oldPos.Z)
		}

		const newPos = pos.new?.value
		if (newPos) {
			unitGrid.insert(unit, newPos.X, newPos.Z)
		}
	}
}

export = new System(updateUnitGrid)
