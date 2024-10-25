import { useThrottle, World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Position, Unit } from "game/shared/components"
import { sendUnitPosition } from "game/shared/remotes"

// In times per second.
const REPLICATION_RATE = 1 / 10

// TODO! You can optimize this by making `sendUnitPosition` an UnreliableRemoteEvent.
// ! If you do this, remember that those can fail. A way to handle that is firing unreliably as usual,
// ! but firing reliably when the unit *just started moving* or *just stopped moving*.
// ! This idea comes from the fact that when something is ephemeral, its okay it being lost, but since
// ! when the unit just started/stopped moving it will stay there, we must guarantee that the client matches that position.
function replicateUnitPosition(world: World) {
	for (const [id, pos] of world.queryChanged(Position)) {
		if (!pos.new || !world.contains(id) || !world.get(id, Unit)) continue
		if (!useThrottle(REPLICATION_RATE, id)) continue

		sendUnitPosition.FireAllClients(id, pos.new.value)
	}
}

export = new System(replicateUnitPosition)
