/**
 * Stores only the necessary, since Y and the rest of the orientation should be inferred.
 * See 'Sending less data' in: https://devforum.roblox.com/t/how-we-reduced-bandwidth-usage-by-60x-in-astro-force-roblox-rts/1202300
 */
export interface Positionals {
	x: number,
	z: number,
	orientation: number,
}

export type SerializedPositionals = Vector3int16

export function serializePositionals(pos: Positionals): SerializedPositionals {
	return new Vector3int16(pos.x, pos.z, pos.orientation)
}

export function deserializePositionals(vec: SerializedPositionals): Positionals {
	return {
		x: vec.X,
		z: vec.Y,
		orientation: vec.Z,
	}
}
