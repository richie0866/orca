import Roact from "@rbxts/roact";
import { useContext } from "@rbxts/roact-hooked";
import { ScaleContext } from "context/scale-context";

const [defaultScale] = Roact.createBinding(1);

export function useScale(): Roact.Binding<number> {
	return useContext(ScaleContext) ?? defaultScale;
}
