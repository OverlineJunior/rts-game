import { AnyEntity, component } from "@rbxts/matter"

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
