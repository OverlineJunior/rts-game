import { UserInputService, Workspace } from "@rbxts/services"

export function getMouseRay() {
	const mousePos = UserInputService.GetMouseLocation()
	return Workspace.CurrentCamera!.ViewportPointToRay(mousePos.X, mousePos.Y)
}

// Returns the screen location of the mouse projected foward by distance.
export function projectMouse(distance: number) {
	const ray = getMouseRay()
	return ray.Origin.add(ray.Direction.Unit.mul(distance))
}

// Returns the raycast from the screen location of the mouse to the 3D world.
export function raycastMouse(distance: number, params?: RaycastParams) {
	const ray = getMouseRay()
	return Workspace.Raycast(ray.Origin, ray.Direction.mul(distance), params)
}

// Returns the 3D world position of the mouse. This would be the end-position of a raycast if nothing was hit.
export function getMouseWorldPosition(distance: number, params?: RaycastParams) {
	return raycastMouse(distance, params)?.Position ?? projectMouse(distance)
}
