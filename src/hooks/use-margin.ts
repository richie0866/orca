import Roact from "@rbxts/roact";
import { useContext } from "@rbxts/roact-hooked";

export const MarginContext = Roact.createContext<Roact.Binding<number>>(undefined!);

const [defaultMargin] = Roact.createBinding(1);

export function useMargin() {
	return useContext(MarginContext) || defaultMargin;
}
