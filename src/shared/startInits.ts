import { World } from "@rbxts/matter"

type InitFn<S extends object> = (world: World, state: S) => void

function getInits<S extends object>(containers: Instance[]): InitFn<S>[] {
	const inits: InitFn<S>[] = []

	containers.forEach(container => {
		container.GetDescendants().forEach(mod => {
			if (!mod.IsA("ModuleScript")) return

			inits.push(require(mod) as InitFn<S>)
		})
	})

	return inits
}

function callInits<S extends object>(inits: InitFn<S>[], world: World, state: S) {
	inits.forEach(init => {
		task.spawn(() => init(world, state))
	})
}

function startInits<S extends object>(containers: Instance[], world: World, state: S) {
	const inits = getInits(containers)
	callInits(inits, world, state)
}

export = startInits
