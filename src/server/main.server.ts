import { ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import startInits from "shared/startInits"
import startMatter from "shared/startMatter"

const systems = [ServerScriptService.server.systems, ReplicatedStorage.shared.systems]
const inits = [ServerScriptService.server.inits]

const state = {}

const world = startMatter(systems, state)
startInits(inits, world, state)
