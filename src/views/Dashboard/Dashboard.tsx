import Roact from "@rbxts/roact";
import { hooked, useMemo } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import { ScaleContext } from "context/scale-context";
import { useAppSelector } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { useViewportSize } from "hooks/common/use-viewport-size";
import { hex } from "utils/color3";
import { map } from "utils/number-util";
import { scale } from "utils/udim2";
import Hint from "views/Hint";
import Clock from "../Clock";
import Navbar from "../Navbar";
import Pages from "../Pages";

// Minimum/maximum screen height that will cause the padding to decrease. Avoids
// rescaling the UI for as long as possible.
const PADDING_MIN_HEIGHT = 980;
const PADDING_MAX_HEIGHT = 1080;

// Minimum/maximum padding to apply to the UI.
const MIN_PADDING_Y = 14;
const MAX_PADDING_Y = 48;

function getPaddingY(height: number) {
	if (height < PADDING_MAX_HEIGHT && height >= PADDING_MIN_HEIGHT) {
		return map(height, PADDING_MIN_HEIGHT, PADDING_MAX_HEIGHT, MIN_PADDING_Y, MAX_PADDING_Y);
	} else if (height < PADDING_MIN_HEIGHT) {
		return MIN_PADDING_Y;
	} else {
		return MAX_PADDING_Y;
	}
}

function getScale(height: number) {
	if (height < PADDING_MIN_HEIGHT) {
		return map(height, PADDING_MIN_HEIGHT, 130, 1, 0);
	} else {
		return 1;
	}
}

function Dashboard() {
	const viewportSize = useViewportSize();
	const isOpen = useAppSelector((state) => state.dashboard.isOpen);

	const [scaleFactor, padding] = useMemo(() => {
		return [viewportSize.map((s) => getScale(s.Y)), viewportSize.map((s) => getPaddingY(s.Y))];
	}, [viewportSize]);

	return (
		<ScaleContext.Provider value={scaleFactor}>
			{/* Shading */}
			<frame
				Size={scale(1, 1)}
				BackgroundColor3={hex("#000000")}
				BackgroundTransparency={useSpring(isOpen ? 0 : 1, {})}
				BorderSizePixel={0}
			>
				<uigradient Transparency={new NumberSequence(1, 0.25)} Rotation={90} />
			</frame>

			{/* Body */}
			<Canvas
				padding={{
					top: 48,
					bottom: padding,
					left: 48,
					right: 48,
				}}
			>
				<Canvas
					padding={{
						bottom: padding.map((p) => 56 + p), // Navbar height + padding
					}}
				>
					<Pages />
					<Hint />
				</Canvas>
				<Navbar />
				<Clock />
			</Canvas>
		</ScaleContext.Provider>
	);
}

export default hooked(Dashboard);
