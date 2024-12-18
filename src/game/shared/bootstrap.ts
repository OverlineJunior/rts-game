import { AnySystem, Debugger, Loop, SystemFn, World } from "@rbxts/matter"
import Plasma from "@rbxts/plasma"
import { RunService, UserInputService } from "@rbxts/services"
import { Renderable } from "game/client/components"
import powerUsers from "./powerUsers"

const DEBUGGER_TOGGLE_KEYCODE = Enum.KeyCode.F4

interface SystemStruct {
	system: SystemFn<[...any]>
	event?: string
	priority?: number
	after?: [AnySystem]
	type?: "onStartup" | "onEvent"
}

export class System {
	public readonly system

	constructor(fn: SystemStruct["system"], properties: Omit<SystemStruct, "system"> = {}) {
		this.system = {
			...properties,
			system: fn,
			type: properties.type ?? "onEvent",
		}
	}
}

function makeDebugger(world: World) {
	const debug = new Debugger(Plasma)
	debug.authorize = plr => powerUsers.includes(plr.UserId)

	debug.findInstanceFromEntity = e => {
		if (!world.contains(e)) return

		return world.get(e, Renderable)?.model
	}

	if (RunService.IsClient()) {
		UserInputService.InputBegan.Connect((input, processed) => {
			if (input.KeyCode === DEBUGGER_TOGGLE_KEYCODE && !processed) {
				debug.toggle()
			}
		})
	}

	return debug
}

function getSystems(containers: Array<Instance>) {
	const systems = new Array<SystemStruct>()

	containers.forEach(container =>
		container.GetDescendants().forEach(mod => {
			if (!mod.IsA("ModuleScript")) return

			const s = require(mod)
			if (!(s instanceof System)) return

			systems.push(s.system)
		}),
	)

	return systems
}

export function runGame(containers: Array<Instance>, state: object) {
	const world = new World()
	const debug = makeDebugger(world)
	const loop = new Loop(world, state, debug.getWidgets())

	debug.loopParameterNames = ["World", "State", "Widgets"]
	debug.autoInitialize(loop)

	const systems = getSystems(containers)
	const onStartup = systems.filter(s => s.type === "onStartup")
	const onEvent = systems.filter(s => s.type === "onEvent")

	onStartup.forEach(({ system }) => system(world, state))

	loop.scheduleSystems(onEvent)
	loop.begin({ default: RunService.Stepped })

	return world
}
