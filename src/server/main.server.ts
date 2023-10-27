import { Players, ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import startMatter from "shared/startMatter"
import { unitBundle } from "./componentBundles"

const containers = [ServerScriptService.server.systems, ReplicatedStorage.shared.systems]
const serverState = {}
const world = startMatter(containers, serverState)

Players.PlayerAdded.Connect((player) => world.spawn(...unitBundle(player, "TestUnit", 25)))
