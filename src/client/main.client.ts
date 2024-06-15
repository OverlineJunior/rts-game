import { ReplicatedStorage } from "@rbxts/services"
import startMatter from "shared/startMatter"
import { ClientState } from "./clientState"
import startInits from "shared/startInits"

const systems = [ReplicatedStorage.client.systems, ReplicatedStorage.shared.systems]
const inits = [ReplicatedStorage.client.inits]

const state: ClientState = {
	selection: {
		units: []
	}
}

const world = startMatter(systems, state)
startInits(inits, world, state)
