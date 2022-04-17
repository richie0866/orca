import Roact from "@rbxts/roact";
import { useContext } from "@rbxts/roact-hooked";

import { ButtonStyle } from "store/themes";

export const ButtonStyleContext = Roact.createContext<ButtonStyle>(undefined!);

export function useButtonStyle() {
	return useContext(ButtonStyleContext);
}
