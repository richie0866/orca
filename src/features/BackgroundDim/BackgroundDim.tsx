import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

import Screen from "components/Screen";
import { useRootSelector } from "hooks/use-root-store";

function BackgroundDim() {
	const visible = useRootSelector((state) => state.pages.visible);
	const visibility = useSpring(visible ? 0 : 1, {});

	return (
		<Screen>
			<frame
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={visibility}
				BorderSizePixel={0}
			>
				<uigradient Transparency={new NumberSequence(1, 0.25)} Rotation={90} />
			</frame>
		</Screen>
	);
}

export default pure(BackgroundDim);
