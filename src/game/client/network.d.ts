// File generated by Blink v0.14.15 (https://github.com/1Axen/Blink)
// This file is not meant to be edited

export declare const stepReplication: () => void
export declare const spawnOnClient: {
	on: (Listener: (Value: { serverId: number, serializedComponents: unknown }) => void) => (() => void)
}
export declare const despawnOnClient: {
	on: (Listener: (Value: { serverId: number }) => void) => (() => void)
}
export declare const sendUnitPosition: {
	on: (Listener: (Value: { serverId: number, x: number, z: number, orientation: number }) => void) => (() => void)
}
export declare const requestMovement: {
	fire: (Value: { serverIds: number[], x: number, z: number, increment: boolean }) => void
}