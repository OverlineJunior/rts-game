import { component } from "@rbxts/matter"
import { ReplicatedStorage } from "@rbxts/services"

export type UnitKind = "TestUnit"

export const Unit = component<{
	kind: UnitKind
	remotes: {
		sendGoalPosition: RemoteEvent<(goalPosition: Vector3) => void>
	}
}>("Unit")
export type Unit = ReturnType<typeof Unit>

const units = ReplicatedStorage.assets.units

export function makeUnitModel(unitKind: UnitKind) {
	switch (unitKind) {
		case "TestUnit":
			return units.testUnit.Clone()
		default:
			error(`Invalid UnitKind "${unitKind}"`)
	}
}
