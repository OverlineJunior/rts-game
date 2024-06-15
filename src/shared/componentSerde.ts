import { AnyComponent } from "@rbxts/matter"
import * as ClientComponents from "client/components"
import * as SharedComponents from "shared/components"

export type SerializedComponents = Map<string, AnyComponent>

function getComponentName(comp: AnyComponent) {
	return tostring(getmetatable(comp))
}

function findComponentCtor(name: string) {
	const clientCtors = { ...ClientComponents, ...SharedComponents }

	for (const [n, ctor] of pairs(clientCtors)) {
		if (n === name) {
			return ctor as unknown as (data: AnyComponent) => AnyComponent
		}
	}
}

export function serializeComponents(comps: Array<AnyComponent>): SerializedComponents {
	const ser: SerializedComponents = new Map()
	comps.forEach((c) => ser.set(getComponentName(c), c))

	return ser
}

export function deserializeComponents(serializedComps: SerializedComponents): AnyComponent[] {
	const comps: Array<AnyComponent> = new Array()

	serializedComps.forEach((data, name) => {
		const ctor = findComponentCtor(name)
		assert(
			ctor,
			`Could not find a component named "${name}" on either of the client or shared sides`,
		)

		comps.push(ctor(data))
	})

	return comps
}
