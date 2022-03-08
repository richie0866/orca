import Roact from "@rbxts/roact";
import { hooked, useEffect, useState } from "@rbxts/roact-hooked";
import { useAppSelector } from "hooks/common/rodux-hooks";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useSpring } from "hooks/common/use-spring";
import { useScale } from "hooks/use-scale";
import { hex } from "utils/color3";
import { scale } from "utils/udim2";

function Hint() {
	const scaleFactor = useScale();
	const hint = useAppSelector((state) => state.dashboard.hint);
	const isDashboardOpen = useAppSelector((state) => state.dashboard.isOpen);

	const [hintDisplay, setHintDisplay] = useState(hint ?? "");
	const isHintVisible = useDelayedUpdate(hint !== undefined && isDashboardOpen, 500, (visible) => !visible);

	useEffect(() => {
		if (isHintVisible && hint !== undefined) {
			setHintDisplay(hint);
		}
	}, [hint, isHintVisible]);

	return (
		<textlabel
			RichText
			Text={hintDisplay}
			TextXAlignment="Right"
			TextYAlignment="Bottom"
			TextColor3={hex("#FFFFFF")}
			TextTransparency={useSpring(isHintVisible ? 0.4 : 1, {})}
			Font="GothamSemibold"
			TextSize={18}
			BackgroundTransparency={1}
			Position={useSpring(isHintVisible ? scale(1, 1) : new UDim2(1, 0, 1, 48), {})}
		>
			<uiscale Scale={scaleFactor} />
		</textlabel>
	);
}

export default hooked(Hint);
