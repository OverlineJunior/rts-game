import { ReplicatedStorage } from "@rbxts/services"

const MODEL_CONTAINER = ReplicatedStorage.assets.unitModels

function expectModel(name: string): Model {
	const m = MODEL_CONTAINER.FindFirstChild(name)
	assert(m, `Model "${name}" could not be found in ${MODEL_CONTAINER.GetFullName()}`)
	assert(m.IsA("Model"), `Expected asset "${m.GetFullName()}" to be a Model, got ${m.ClassName}`)

	return m
}

export interface UnitData {
	name: string
	model: Model
	speed: number
	[key: string]: unknown
}

export const basic = {
	name: "Basic",
	model: expectModel("basic"),
	speed: 10,
} as const satisfies UnitData
