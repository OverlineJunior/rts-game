import { UserInputService, Workspace } from "@rbxts/services"

<<<<<<< HEAD
export function getMouseRay() {
=======
/**
 * Returns the Ray from the screen location of the mouse to the 3D world.
 */
export function getMouseRay(): Ray {
>>>>>>> remake
	const mousePos = UserInputService.GetMouseLocation()
	return Workspace.CurrentCamera!.ViewportPointToRay(mousePos.X, mousePos.Y)
}

<<<<<<< HEAD
// Returns the screen location of the mouse projected foward by distance.
export function projectMouse(distance: number) {
=======
/**
 * Returns the screen location of the mouse projected foward by distance.
 * @param distance The distance the Raycast should travel
 */
export function projectMouse(distance: number): Vector3 {
>>>>>>> remake
	const ray = getMouseRay()
	return ray.Origin.add(ray.Direction.Unit.mul(distance))
}

<<<<<<< HEAD
// Returns the raycast from the screen location of the mouse to the 3D world.
export function raycastMouse(distance: number, params?: RaycastParams) {
=======
/**
 * Returns the raycast from the screen location of the mouse to the 3D world.
 * @param distance The distance the Raycast should travel
 * @param params The RaycastParams to use
 */
export function raycastMouse(distance: number, params?: RaycastParams): RaycastResult | undefined {
>>>>>>> remake
	const ray = getMouseRay()
	return Workspace.Raycast(ray.Origin, ray.Direction.mul(distance), params)
}

<<<<<<< HEAD
// Returns the 3D world position of the mouse. This would be the end-position of a raycast if nothing was hit.
export function getMouseWorldPosition(distance: number, params?: RaycastParams) {
=======
/**
 * Returns the 3D world position of the mouse. This would be the end-position of a raycast if nothing was hit.
 * @param distance The distance the Raycast should travel
 * @param params The RaycastParams to use
 */
export function getMouseWorldPosition(distance: number, params?: RaycastParams): Vector3 {
>>>>>>> remake
	return raycastMouse(distance, params)?.Position ?? projectMouse(distance)
}
