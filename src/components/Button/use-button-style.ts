import Roact from "@rbxts/roact";
import { ButtonStyle } from "store/themes";
import { useContext } from "@rbxts/roact-hooked";

export const ButtonStyleContext = Roact.createContext<ButtonStyle>(undefined!);

export function useButtonStyle() {
	return useContext(ButtonStyleContext);
}
