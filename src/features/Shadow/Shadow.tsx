import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useAnimation } from "@rbxts/roact-hooked-plus";

import Screen from "components/Screen";
import { useRootSelector } from "hooks/use-root-store";

function Shadow() {
	const visible = useRootSelector((state) => state.pages.visible);

	return (
		<Screen>
			<frame
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={useAnimation(visible ? 0 : 1)}
				BorderSizePixel={0}
			>
				<uigradient Transparency={new NumberSequence(1, 0.25)} Rotation={90} />
			</frame>
		</Screen>
	);
}

export default pure(Shadow);
