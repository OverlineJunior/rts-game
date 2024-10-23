import { ReplicatedStorage } from "@rbxts/services"
import startInits from "game/shared/startInits"
import startMatter from "game/shared/startMatter"
import { ClientState } from "./clientState"

const systems = [ReplicatedStorage.client.systems, ReplicatedStorage.shared.systems]
const inits = [ReplicatedStorage.client.inits]

const state: ClientState = {
	selection: {
		units: []
	}
}

const world = startMatter(systems, state)
startInits(inits, world, state)
