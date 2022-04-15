import Roact from "@rbxts/roact";
import { hooked, useMemo } from "@rbxts/roact-hooked";
import { useViewportSize } from "@rbxts/roact-hooked-plus";

import Clock from "features/Clock";
import Navbar from "features/Navbar";
import Shadow from "features/Shadow";
import Shortcuts from "features/Shortcuts";

import Home from "pages/Home";

import { MarginContext } from "hooks/use-margin";
import { ScaleContext } from "hooks/use-scale";
import { getMargin, getScale } from "utils/viewport-util";

function App() {
	const viewportSize = useViewportSize();

	const [scale, margin] = useMemo(() => {
		const scale = viewportSize.map(getScale);
		const margin = viewportSize.map(getMargin);

		return [scale, margin];
	}, [viewportSize]);

	return (
		<ScaleContext.Provider value={scale}>
			<MarginContext.Provider value={margin}>
				<Shortcuts />
				<Shadow />

				<Home />

				<Navbar />
				<Clock />
			</MarginContext.Provider>
		</ScaleContext.Provider>
	);
}

export default hooked(App);
