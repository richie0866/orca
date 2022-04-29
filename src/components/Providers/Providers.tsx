import Roact from "@rbxts/roact";
import { hooked, useMemo } from "@rbxts/roact-hooked";
import { useViewportSize } from "@rbxts/roact-hooked-plus";

import { MarginContext } from "hooks/use-margin";
import { ScaleContext } from "hooks/use-scale";
import { getMargin, getScale } from "./utils";

function Providers(props: Roact.PropsWithChildren) {
	const viewportSize = useViewportSize();

	const [scale, margin] = useMemo(() => {
		const scale = viewportSize.map(getScale);
		const margin = viewportSize.map(getMargin);

		return [scale, margin];
	}, [viewportSize]);

	return (
		<ScaleContext.Provider value={scale}>
			<MarginContext.Provider value={margin}>{props[Roact.Children]}</MarginContext.Provider>
		</ScaleContext.Provider>
	);
}

export default hooked(Providers);
