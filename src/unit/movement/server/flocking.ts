import { AnyEntity, useThrottle, World } from "@rbxts/matter"
import { ServerState } from "game/server/serverState"
import { System } from "game/shared/bootstrap"
import { Acceleration, Position, Unit, Velocity } from "game/shared/components"
import { limit } from "game/shared/vector3"

const VIEW_RADIUS = 4

function distance(a: Vector3, b: Vector3): number {
	return math.pow(b.X - a.X, 2) + math.pow(b.Z - a.Z, 2)
}

function cohesion(unitPos: Vector3, unitVel: Vector3, nearbyUnits: AnyEntity[], world: World): Vector3 {
	const nearbyPositions = nearbyUnits
			.map(u => world.get(u, Position)!.value)

	if (nearbyPositions.size() === 0) return Vector3.zero

	const centerMass = nearbyPositions
		.reduce((acc, p) => acc.add(p), new Vector3())
		.div(nearbyPositions.size())

	if (centerMass.sub(unitPos) === Vector3.zero) return Vector3.zero

	const toCenter = centerMass.sub(unitPos).Unit.mul(8)
	const steer = limit(toCenter.sub(unitVel), 99)

	return steer
}

function separation(unitPos: Vector3, nearbyUnits: AnyEntity[], world: World): Vector3 {
	const nearbyPositions = nearbyUnits
			.map(u => world.get(u, Position)!.value)

	if (nearbyPositions.size() === 0) return Vector3.zero

	const steer = nearbyPositions
		.map(p => {
			const dist = distance(unitPos, p)
			return dist === 0 || unitPos.sub(p) === Vector3.zero ? Vector3.zero : unitPos.sub(p).Unit.div(dist)
		})
		.reduce((acc, s) => acc.add(s), new Vector3())

	if (steer === Vector3.zero) return Vector3.zero

	return steer.Unit.mul(16)
}

function alignment(unitVel: Vector3, nearbyUnits: AnyEntity[], world: World): Vector3 {
	const nearbyVelocities = nearbyUnits
			.map(u => world.get(u, Velocity)!.value)

	if (nearbyVelocities.size() === 0) return Vector3.zero

	const avgVelocity = nearbyVelocities
		.reduce((acc, v) => acc.add(v), new Vector3())
		.div(nearbyVelocities.size())

	const steer = limit(avgVelocity.sub(unitVel), 99)

	return steer
}

// Update 1 / UPDATE_FRACTION of units per frame.
const UPDATE_FRACTION = 3

let counter = 0

function flocking(world: World, { unitGrid }: ServerState) {
	for (const [unit, pos, vel] of world.query(Position, Velocity, Unit)) {
		if (unit % UPDATE_FRACTION !== counter) continue

		const nearby = unitGrid
			.query(pos.value.X, pos.value.Z, VIEW_RADIUS)
			.filter(u => {
				const p = world.get(u, Position)!.value
				return u !== unit && distance(pos.value, p) < VIEW_RADIUS
			})

		let steering = Vector3.zero
		steering = steering.add(cohesion(pos.value, vel.value, nearby, world))
		steering = steering.add(separation(pos.value, nearby, world))
		//steering = steering.add(alignment(vel.value, nearby, world))

		world.insert(unit, Acceleration({ value: steering }))
	}

	// Cycle the counter from 0 to UPDATE_FACTION.
	counter = (counter + 1) % UPDATE_FRACTION;
}

export = new System(flocking)
