import { World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Squad, SquadMember } from "game/shared/components"
import { squadMemberCount } from "./squadUtil"

function squadCleanup(world: World) {
	for (const [id, squad] of world.query(Squad)) {
		if (squad.goals.isEmpty() || squadMemberCount(id, world) === 0) {
			world.despawn(id)
		}
	}

	for (const [id, squadMember] of world.query(SquadMember)) {
		if (world.contains(squadMember.squad)) continue

		world.remove(id, SquadMember)
	}
}

export = new System(squadCleanup, { priority: -math.huge })
