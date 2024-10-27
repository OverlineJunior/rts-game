// import { AnyEntity, World } from "@rbxts/matter"
// import { ServerPosition } from "game/client/components"
// import { System } from "game/shared/bootstrap"
// import { Position } from "game/shared/components"
// import { fuzzyEqual } from "game/shared/vector3"

// const lastDirection = new Map<number, Vector3>()

// function suddenDirectionChange(unit: AnyEntity, oldPos: Vector3, newPos: Vector3): boolean {
// 	const dir = oldPos.sub(newPos).Unit
// 	let flag = false

// 	if (lastDirection.has(unit)) {
// 		const lastDir = lastDirection.get(unit)!
// 		flag = !fuzzyEqual(dir, lastDir)
// 	}

// 	lastDirection.set(unit, dir)
// 	return flag
// }

// // If he server takes too long to send the new position, affected units would start moving behind the unaffected ones.
// // To remedy this, we snap the client position to the server one so the affected unit doesn't lag behind *too much*.
// function snapUnitToServerPos(world: World) {
// 	for (const [id, serverPos] of world.queryChanged(ServerPosition)) {
// 		if (
// 			!serverPos.old
// 			|| !serverPos.new
// 			|| !world.contains(id)
// 			|| !world.get(id, Position)
// 		) continue

// 		if (suddenDirectionChange(
// 			id,
// 			serverPos.old.value,
// 			serverPos.new.value
// 		)) continue

// 		const pos = world.get(id, Position)!
// 		world.insert(id, pos.patch({ value: serverPos.old.value }))
// 	}

// 	// No memory leaks in my house!
// 	for (const [id, rec] of world.queryChanged(ServerPosition)) {
// 		if (rec.new) continue

// 		lastDirection.delete(id)
// 	}
// }

// export = new System(snapUnitToServerPos)
