import Roact from "@rbxts/roact";
import { useContext } from "@rbxts/roact-hooked";

export const ScaleContext = Roact.createContext<Roact.Binding<number>>(undefined!);

const [defaultScale] = Roact.createBinding(1);

export function useScale() {
	return useContext(ScaleContext) || defaultScale;
}
