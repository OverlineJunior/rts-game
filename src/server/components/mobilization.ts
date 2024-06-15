import { AnyEntity, World, component } from "@rbxts/matter"

export const Mobilization = component<{
	units: AnyEntity[],
	goalQueue: Vector3[],
}>("Mobilization")
export type Mobilization = ReturnType<typeof Mobilization>

/**
 * Removes `unit` from the mobilization that contains it, if it exists.
 * @param unit The unit ID to demobilize
 * @param world Zawarudo
 */
export function demobilize(unit: AnyEntity, world: World) {
	for (const [mobId, mob] of world.query(Mobilization)) {
		const filtered = mob.units.filter(u => u !== unit)
		if (mob.units === filtered) continue

		world.insert(mobId, mob.patch({ units: filtered }))
	}
}

/**
 * Removes all `units` from all the mobilizations that might contain them, if any.
 * @param units The unit IDs to demobilize
 * @param world Zawarudo
 */
export function demobilizeAll(units: AnyEntity[], world: World) {
	for (const [mobId, mob] of world.query(Mobilization)) {
		const filtered = mob.units.filter(u => !units.includes(u))
		if (mob.units === filtered) continue

		world.insert(mobId, mob.patch({ units: filtered }))
	}
}
