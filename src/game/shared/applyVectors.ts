import { World } from "@rbxts/matter"
import { System } from "./bootstrap"
import { Acceleration, Position, Velocity } from "./components"
import { limit } from "./vector3"

function applyVectors(world: World) {
	for (const [id, pos, vel, acc] of world.query(Position, Velocity, Acceleration)) {
		const newVel = limit(vel.value.add(acc.value), 0.1)
		const newPos = pos.value.add(newVel)

		world.insert(
			id,
			Position({ value: newPos }),
			Velocity({ value: Vector3.zero }),
			Acceleration({ value: Vector3.zero }),
		)
	}
}

export = new System(applyVectors)
