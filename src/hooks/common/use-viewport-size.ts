import { useBinding, useEffect, useState } from "@rbxts/roact-hooked";
import { Workspace } from "@rbxts/services";

export function useViewportSize(onChange?: (size: Vector2) => void) {
	const [camera, setCamera] = useState(Workspace.CurrentCamera!);
	const [size, setSize] = useBinding(camera.ViewportSize);

	useEffect(() => {
		const handle = Workspace.GetPropertyChangedSignal("CurrentCamera").Connect(() => {
			if (Workspace.CurrentCamera) {
				setCamera(Workspace.CurrentCamera);
				setSize(Workspace.CurrentCamera.ViewportSize);
				onChange?.(Workspace.CurrentCamera.ViewportSize);
			}
		});

		return () => {
			handle.Disconnect();
		};
	}, []);

	useEffect(() => {
		const handle = camera.GetPropertyChangedSignal("ViewportSize").Connect(() => {
			setSize(camera.ViewportSize);
			onChange?.(camera.ViewportSize);
		});

		return () => {
			handle.Disconnect();
		};
	}, [camera]);

	return size;
}
