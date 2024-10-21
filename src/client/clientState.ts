import { AnyEntity } from "@rbxts/matter"

export interface Selection {
	units: AnyEntity[]
}

export interface ClientState {
	selection: Selection
}
