import Roact from "@rbxts/roact";
import { CardStyle } from "reducers/themes";
import { Page } from "reducers/pages";
import { useContext } from "@rbxts/roact-hooked";

interface Context {
	style: CardStyle;
	page: keyof typeof Page;
}

export const CardContext = Roact.createContext<Context>(undefined!);

export function useCardContext() {
	return useContext(CardContext);
}
