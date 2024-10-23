import { AnyEntity, World, useEvent } from "@rbxts/matter"
import { Players, UserInputService } from "@rbxts/services"
import { ClientState } from "game/client/clientState"
import { Owner, Unit } from "game/shared/components"

const CLIENT = Players.LocalPlayer
const M1 = Enum.UserInputType.MouseButton1

function updateSelection(world: World, state: ClientState) {
	// TODO! Always selecting every unit is temporary behavior for testing.
	const units: AnyEntity[] = []
	for (const [id, owner] of world.query(Owner, Unit)) {
		if (CLIENT !== owner.player) continue

		units.push(id)
	}

	state.selection.units = units
}

function selectUnits(world: World, state: ClientState) {
	for (const [_, input, ui] of useEvent(UserInputService, "InputBegan")) {
		if (ui || input.UserInputType !== M1) return

		updateSelection(world, state)
	}
}

export = selectUnits
