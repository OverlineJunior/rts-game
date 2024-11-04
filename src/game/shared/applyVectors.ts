import { useDeltaTime, World } from "@rbxts/matter"
import { System } from "./bootstrap"
import { Acceleration, Position, Velocity } from "./components"
import { limit } from "./vector3"

function applyVectors(world: World) {
	for (const [id, pos, vel, acc] of world.query(Position, Velocity, Acceleration)) {
		const newVel = vel.value.add(acc.value)
		const newPos = pos.value.add(newVel.mul(useDeltaTime()))

		if (pos.value !== newPos) {
			world.insert(id, Position({ value: newPos }))
		}

		if (vel.value !== Vector3.zero) {
			world.insert(id, Velocity({ value: Vector3.zero }))
		}

		if (acc.value !== Vector3.zero) {
			world.insert(id, Acceleration({ value: Vector3.zero }))
		}
	}
}

export = new System(applyVectors)
