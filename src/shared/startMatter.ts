import { Debugger, Loop, SystemFn, World } from "@rbxts/matter"
import Plasma from "@rbxts/plasma"
import { RunService, UserInputService } from "@rbxts/services"

const DEBUGGER_TOGGLE_KEYCODE = Enum.KeyCode.F4
const DEBUGGER_AUTHORIZED_USER_IDS = [93428451]

function makeDebugger() {
	const debug = new Debugger(Plasma)
	debug.authorize = (plr) => DEBUGGER_AUTHORIZED_USER_IDS.includes(plr.UserId)

	if (RunService.IsClient()) {
		UserInputService.InputBegan.Connect((input, processed) => {
			if (input.KeyCode === DEBUGGER_TOGGLE_KEYCODE && !processed) {
				debug.toggle()
			}
		})
	}

	return debug
}

function startMatter<S extends object>(containers: Array<Folder>, state: S) {
	const world = new World()
	const debug = makeDebugger()
	const loop = new Loop(world, state, debug.getWidgets())
	const systems = new Array<SystemFn<[World, S]>>()

	debug.autoInitialize(loop)

	containers.forEach((container) =>
		container.GetDescendants().forEach((mod) => {
			if (!mod.IsA("ModuleScript")) return

			systems.push(require(mod) as SystemFn<[World, S]>)
		}),
	)

	loop.scheduleSystems(systems)
	loop.begin({
		default: RunService.Stepped,
	})

	return world
}

export = startMatter
