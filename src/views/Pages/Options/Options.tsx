import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import { useScale } from "hooks/use-scale";
import { scale } from "utils/udim2";
import Config from "./Config";
import Shortcuts from "./Shortcuts";
import Themes from "./Themes";

function Options() {
	const scaleFactor = useScale();

	return (
		<Canvas position={scale(0, 1)} anchor={new Vector2(0, 1)}>
			<uiscale Scale={scaleFactor} />
			<Config />
			<Themes />
			<Shortcuts />
		</Canvas>
	);
}

export default pure(Options);
