import { ReplicatedStorage } from "@rbxts/services"
import { AnyEntity } from "@rbxts/matter"
import startInits from "game/shared/startInits"
import startMatter from "game/shared/startMatter"

export interface Selection {
	units: AnyEntity[]
}

export interface ClientState {
	selection: Selection
}

const systems = [ReplicatedStorage.client.systems, ReplicatedStorage.shared.systems]
const inits = [ReplicatedStorage.client.inits]

const state: ClientState = {
	selection: {
		units: []
	}
}

const world = startMatter(systems, state)
startInits(inits, world, state)
