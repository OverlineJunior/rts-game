import { World } from "@rbxts/matter"
import { Position, Unit } from "shared/components"
import { sendUnitPosition } from "shared/remotes"

// TODO! You can optimize this by making `sendUnitPosition` an UnreliableRemoteEvent.
// ! If you do this, remember that those can fail. A way to handle that is firing unreliably as usual,
// ! but firing reliably when the unit *just started moving* or *just stopped moving*.
// ! This idea comes from the fact that when something is ephemeral, its okay it being lost, but since
// ! when the unit just started/stopped moving it will stay there, we must guarantee that the client matches that position.
// We dont send in batches for performance gains because we want unit's positions to be independent from
// each other. This way, a unit that dashes can dash without having to wait for the batch to be filled.
function replicateUnitPosition(world: World) {
	for (const [id, pos] of world.queryChanged(Position)) {
		if (!pos.new || !world.contains(id) || !world.get(id, Unit)) continue

		sendUnitPosition.FireAllClients(id, pos.new.value)

		// Simulate extreme latency for testing purposes.
		// if (math.random(0, 125) === 1) {
		// 	task.delay(0.25, () => sendUnitPosition.FireAllClients(id, pos.new!.value))
		// } else {
		// 	sendUnitPosition.FireAllClients(id, pos.new.value)
		// }
	}
}

export = replicateUnitPosition
