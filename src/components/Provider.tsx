import Roact from "@rbxts/roact";
import { Provider as RoduxProvider } from "@rbxts/roact-rodux-hooked";

import { getStore } from "store";

export default function Provider(props: Roact.PropsWithChildren) {
	return <RoduxProvider store={getStore()}>{props[Roact.Children]}</RoduxProvider>;
}
