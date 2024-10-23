import { ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import { runGame } from "game/shared/bootstrap"

const systems = [ServerScriptService.server, ReplicatedStorage.shared]

const state = {}

const world = runGame(systems, state)
