import { Renderable } from "game/client/components";
import { Replicated } from "game/server/components";
import { Unit, Owner, Position, Speed, Velocity, Acceleration } from "game/shared/components";
import { UnitData } from "unit/shared/unitData";

export function unitBundle(owner: Player, initialX: number, initialZ: number, data: UnitData) {
	const height = data.model.GetBoundingBox()[1].Y

	return [
		Unit({}),
		Replicated({ finishedFor: [] }),
		Owner({ player: owner }),
		Position({ value: new Vector3(initialX, height / 2, initialZ) }),
		Speed({ value: data.speed }),
		Velocity({ value: Vector3.zero }),
		Acceleration({ value: Vector3.zero }),
		Renderable({ model: data.model }),
	]
}
