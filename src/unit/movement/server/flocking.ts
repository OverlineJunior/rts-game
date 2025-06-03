import { AnyEntity, useThrottle, World } from "@rbxts/matter"
import { Widgets } from "@rbxts/plasma"
import { ServerState } from "game/server/serverState"
import { System } from "game/shared/bootstrap"
import { Acceleration, Position, Unit, Velocity } from "game/shared/components"
import { limit } from "game/shared/vector3"

interface FlockingConfig {
	viewRadius: number
	updateFraction: number
}

interface CohesionConfig {
	mul: number
	limit: number
}

interface SeparationConfig {
	mul: number
}

// Update 1 / UPDATE_FRACTION of units per frame.
const UPDATE_FRACTION = 3
const VIEW_RADIUS = 4

const COH_MUL = 8
const COH_LIMIT = 99

const SEP_MUL = 16

function distance(a: Vector3, b: Vector3): number {
	return math.pow(b.X - a.X, 2) + math.pow(b.Z - a.Z, 2)
}

function cohesion(
	unitPos: Vector3,
	unitVel: Vector3,
	nearbyUnits: AnyEntity[],
	world: World,
	config: CohesionConfig,
): Vector3 {
	const nearbyPositions = nearbyUnits
			.map(u => world.get(u, Position)!.value)

	if (nearbyPositions.size() === 0) return Vector3.zero

	const centerMass = nearbyPositions
		.reduce((acc, p) => acc.add(p), new Vector3())
		.div(nearbyPositions.size())

	if (centerMass.sub(unitPos) === Vector3.zero) return Vector3.zero

	const toCenter = centerMass.sub(unitPos).Unit.mul(config.mul)
	const steer = limit(toCenter.sub(unitVel), config.limit)

	return steer
}

function separation(
	unitPos: Vector3,
	nearbyUnits: AnyEntity[],
	world: World,
	config: SeparationConfig,
): Vector3 {
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

	return steer.Unit.mul(config.mul)
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

function getConfigs(ui: Widgets): [FlockingConfig, CohesionConfig, SeparationConfig] {
	ui.label("View Radius")
	const viewRadius = ui.slider({ min: 0, max: 64, initial: VIEW_RADIUS })

	ui.label("Update Fraction")
	const updateFraction = ui.slider({ min: 1, max: 12, initial: UPDATE_FRACTION })

	ui.label("Cohesion Multiplier")
	const cohMul = ui.slider({ min: 0, max: 32, initial: COH_MUL })
	ui.label("Cohesion Limit")
	const cohLimit = ui.slider({ min: 0, max: 400, initial: COH_LIMIT })

	ui.label("Separation Multiplier")
	const sepMul = ui.slider({ min: 0, max: 64, initial: SEP_MUL })

	const flock: FlockingConfig = { viewRadius, updateFraction }

	const coh: CohesionConfig = { mul: cohMul, limit: cohLimit }

	const sep: SeparationConfig = { mul: sepMul }

	return [flock, coh, sep]
}

let counter = 0

function flocking(
	world: World,
	{ unitGrid }: ServerState,
	ui: Widgets
) {
	const [flockConfig, cohConfig, sepConfig] = getConfigs(ui)

	for (const [unit, pos, vel] of world.query(Position, Velocity, Unit)) {
		if (unit % UPDATE_FRACTION !== counter) continue

		const nearby = unitGrid
			.query(pos.value.X, pos.value.Z, flockConfig.viewRadius)
			.filter(u => {
				const p = world.get(u, Position)!.value
				return u !== unit && distance(pos.value, p) < flockConfig.viewRadius
			})

		let steering = Vector3.zero
		steering = steering.add(cohesion(pos.value, vel.value, nearby, world, cohConfig))
		steering = steering.add(separation(pos.value, nearby, world, sepConfig))
		//steering = steering.add(alignment(vel.value, nearby, world))

		world.insert(unit, Acceleration({ value: steering }))
	}

	// Cycle the counter from 0 to UPDATE_FACTION.
	counter = (counter + 1) % UPDATE_FRACTION;
}

export = new System(flocking)
