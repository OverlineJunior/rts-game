import { AnyEntity, World } from "@rbxts/matter"
import { System } from "game/shared/bootstrap"
import { Acceleration, Position, Unit, Velocity } from "game/shared/components"
import { limit } from "game/shared/vector3"

const VIEW_RADIUS = 2

function distance(a: Vector3, b: Vector3): number {
	const p = new Vector2(a.X, a.Z)
	const q = new Vector2(b.X, b.Z)
	return p.sub(q).Magnitude
}

function nearbyUnits(toUnit: AnyEntity, radius: number, world: World) {
	const nearby = []
	const pos = world.get(toUnit, Position)!.value

	for (const [otherUnit, otherPos] of world.query(Position, Unit)) {
		if (otherUnit === toUnit) continue

		if (distance(pos, otherPos.value) < radius) {
			nearby.push(otherUnit)
		}
	}

	return nearby
}

function cohesion(unitId: AnyEntity, unitPos: Vector3, unitVel: Vector3, world: World): Vector3 {
	const nearbyPositions = nearbyUnits(unitId, VIEW_RADIUS, world)
			.map(u => world.get(u, Position)!.value)

	if (nearbyPositions.size() === 0) return Vector3.zero

	const centerMass = nearbyPositions
		.reduce((acc, p) => acc.add(p), new Vector3())
		.div(nearbyPositions.size())

	const toCenter = centerMass.sub(unitPos).Unit.mul(4)
	const steer = limit(toCenter.sub(unitVel), 0.1)

	return steer
}

function separation(unitId: AnyEntity, unitPos: Vector3, world: World): Vector3 {
	const nearbyPositions = nearbyUnits(unitId, VIEW_RADIUS, world)
			.map(u => world.get(u, Position)!.value)

	if (nearbyPositions.size() === 0) return Vector3.zero

	const steer = nearbyPositions
		.map(p => {
			const dist = distance(unitPos, p)
			return dist === 0 ? Vector3.zero : unitPos.sub(p).Unit.div(dist)
		})
		.reduce((acc, s) => acc.add(s), new Vector3())
		.Unit.mul(4)

	return steer
}

function alignment(unitId: AnyEntity, unitVel: Vector3, world: World): Vector3 {
	const nearbyVelocities = nearbyUnits(unitId, VIEW_RADIUS, world)
			.map(u => world.get(u, Velocity)!.value)

	if (nearbyVelocities.size() === 0) return Vector3.zero

	const avgVelocity = nearbyVelocities
		.reduce((acc, v) => acc.add(v), new Vector3())
		.div(nearbyVelocities.size())

	const steer = limit(avgVelocity.sub(unitVel), 0.1)

	return steer
}

function flocking(world: World) {
	for (const [unit, pos, vel] of world.query(Position, Velocity, Unit)) {
		let steering = Vector3.zero
		steering = steering.add(cohesion(unit, pos.value, vel.value, world))
		steering = steering.add(separation(unit, pos.value, world))
		steering = steering.add(alignment(unit, vel.value, world))

		world.insert(unit, Acceleration({ value: steering }))
	}
}

export = new System(flocking)
