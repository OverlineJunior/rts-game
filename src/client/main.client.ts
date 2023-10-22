import { ReplicatedStorage } from "@rbxts/services"
import startMatter from "shared/startMatter"
import receiveEntityReplication from "./receiveEntityReplication"

const containers = [ReplicatedStorage.client.systems, ReplicatedStorage.shared.systems]
const serverState = {}
const world = startMatter(containers, serverState)

receiveEntityReplication(world)
