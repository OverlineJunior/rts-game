import { ReplicatedStorage } from "@rbxts/services"
import { runGame } from "game/shared/bootstrap"
import { ClientState } from "./clientState"

const systems = [ReplicatedStorage.client, ReplicatedStorage.shared]

const state: ClientState = {
	selection: {
		units: []
	}
}

const world = runGame(systems, state)
