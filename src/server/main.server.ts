<<<<<<< HEAD
import { Players, ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import startMatter from "shared/startMatter"
import { unitBundle } from "./componentBundles"

const containers = [ServerScriptService.server.systems, ReplicatedStorage.shared.systems]
const serverState = {}
const world = startMatter(containers, serverState)

Players.PlayerAdded.Connect((player) => world.spawn(...unitBundle(player, "TestUnit", 25)))
=======
import { ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import startInits from "shared/startInits"
import startMatter from "shared/startMatter"

const systems = [ServerScriptService.server.systems, ReplicatedStorage.shared.systems]
const inits = [ServerScriptService.server.inits]

const state = {}

const world = startMatter(systems, state)
startInits(inits, world, state)
>>>>>>> remake
