import { World } from "@rbxts/matter"
import { GoalPositions, Unit } from "shared/components"

function sendGoalsReplication(world: World) {
	for (const [id, goalsRec] of world.queryChanged(GoalPositions)) {
		if (!goalsRec.old || !goalsRec.new) continue

		const unit = world.get(id, Unit)
		if (!unit) continue

		unit.remotes.replicateGoalQueue.FireAllClients(goalsRec.new.queue)
	}
}

export = sendGoalsReplication
