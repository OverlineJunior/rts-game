import { ReplicatedStorage, ServerScriptService } from "@rbxts/services"
import startMatter from "shared/startMatter"

const containers = [ServerScriptService.server.systems, ReplicatedStorage.shared.systems]
const serverState = {}
const world = startMatter(containers, serverState)
