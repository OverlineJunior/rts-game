import { UserInputService, Workspace } from "@rbxts/services"

/**
 * Returns the Ray from the screen location of the mouse to the 3D world.
 */
export function getMouseRay(): Ray {
	const mousePos = UserInputService.GetMouseLocation()
	return Workspace.CurrentCamera!.ViewportPointToRay(mousePos.X, mousePos.Y)
}

/**
 * Returns the screen location of the mouse projected foward by distance.
 * @param distance The distance the Raycast should travel
 */
export function projectMouse(distance: number): Vector3 {
	const ray = getMouseRay()
	return ray.Origin.add(ray.Direction.Unit.mul(distance))
}

/**
 * Returns the raycast from the screen location of the mouse to the 3D world.
 * @param distance The distance the Raycast should travel
 * @param params The RaycastParams to use
 */
export function raycastMouse(distance: number, params?: RaycastParams): RaycastResult | undefined {
	const ray = getMouseRay()
	return Workspace.Raycast(ray.Origin, ray.Direction.mul(distance), params)
}

/**
 * Returns the 3D world position of the mouse. This would be the end-position of a raycast if nothing was hit.
 * @param distance The distance the Raycast should travel
 * @param params The RaycastParams to use
 */
export function getMouseWorldPosition(distance: number, params?: RaycastParams): Vector3 {
	return raycastMouse(distance, params)?.Position ?? projectMouse(distance)
}
