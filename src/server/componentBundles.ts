import { Unit, Owner, Position, GoalPositions, Speed } from "shared/components"
import { Replicated } from "./components"
import { UnitKind } from "shared/components/unit"
import Make from "@rbxts/make"
import { ReplicatedStorage } from "@rbxts/services"

// For RemoteEvents to be sent to the client-side, they have to be parented.
function makeRemoteEvent(name: string) {
	return Make("RemoteEvent", {
		Name: name,
		Parent:
			ReplicatedStorage.FindFirstChild("remotesMadeByCode") ??
			Make("Folder", { Name: "remotesMadeByCode", Parent: ReplicatedStorage }),
	})
}

export function unitBundle(owner: Player, kind: UnitKind, speed: number) {
	return [
		Unit({
			kind,
			remotes: {
				sendGoalPosition: makeRemoteEvent("sendGoalPosition"),
				replicateGoalQueue: makeRemoteEvent("replicateGoalQueue"),
			},
		}),
		Owner({ player: owner }),
		Position({ value: Vector3.zero }),
		GoalPositions({ queue: [] }),
		Speed({ base: speed }),
		Replicated({ finishedFor: [] }),
	]
}
