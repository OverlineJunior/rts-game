import { AnyEntity, Entity, World, component } from "@rbxts/matter"

/**
 * Group of units moving towards a goal.
 *
 * Should only be created or mutated by using the provided functions.
 * @readonly
 */
interface Mob {
	leader: AnyEntity,
	units: AnyEntity[],
	goalQueue: [Vector3],
}

/**
 * Creates a new mobilization with the given goal and units, where one of them will be the leader.
 * @param units The units to mobilize
 * @param firstGoal The first goal to mobilize to
 */
export const Mobilization = component<Mob>("Mobilization")
export type Mobilization = ReturnType<typeof Mobilization>


/**
 * Spawns a new mobilization with the given goal and units, where one of them will be the leader.
 *
 * If there are units that are already mobilized, they will be demobilized from their old mobilization.
 * @param units The units to mobilize
 * @param firstGoal The first goal to mobilize to
 */
export function spawnMobilization(
	units: [AnyEntity],
	firstGoal: Vector3,
	world: World
): Entity<[Mobilization]> {
	assert(!units.isEmpty(), "Cannot create a mobilization with no units")

	demobilizeAll(units, world)

	return world.spawn(Mobilization({
		leader: units.pop()!,
		units: [...units],
		goalQueue: [firstGoal],
	}))
}

export function dequeueGoal(mobilization: AnyEntity, world: World) {
	const mob = world.get(mobilization, Mobilization)
		?? error("Mobilization not found")

	if (mob.goalQueue.size() <= 1) {
		world.despawn(mobilization)
	} else {
		const newQueue = [...mob.goalQueue] as [Vector3]
		newQueue.shift()

		world.insert(mobilization, mob.patch({ goalQueue: newQueue}))
	}
}

/**
 * Places `unit` on an existing mobilization.
 * @param unit The unit to mobilize
 * @param mobilization The mobilization to mobilize to
 */
export function mobilizeTo(unit: AnyEntity, mobilization: AnyEntity, world: World) {
	const mob = world.get(mobilization, Mobilization)
		?? error("Mobilization not found")

	demobilize(unit, world)
	world.insert(mobilization, mob.patch({ units: [...mob.units, unit] }))
}

/**
 * Removes `unit` from the mobilization that contains it, if it exists.
 *
 * If `unit` is the leader, the next unit in the mobilization will take its place.
 * Now, if there's no next unit, the mobilization will be despawned.
 *
 * If `unit` is already mobilized, it will be demobilized from its old mobilization.
 * @param unit The unit ID to demobilize
 */
export function demobilize(unit: AnyEntity, world: World) {
	for (const [mobId, mob] of world.query(Mobilization)) {
		if (unit === mob.leader) {
			const newLeader = mob.units[0]
			if (!newLeader) {
				world.despawn(mobId)
				return
			}

			world.insert(mobId, mob.patch({
				leader: newLeader,
				units: mob.units.filter(u => u !== newLeader)
			}))
		} else if (mob.units.includes(unit)) {
			world.insert(mobId, mob.patch({
				units: mob.units.filter(u => u !== unit)
			}))
		}
	}
}

/**
 * Calls `demobilize` on all `units`.
 * @param units The units to demobilize
 */
export function demobilizeAll(units: AnyEntity[], world: World) {
	units.forEach(unit => demobilize(unit, world))
}
