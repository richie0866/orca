import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

import Root from "components/Root";
import { usePagesVisible } from "hooks/use-page-open";

function BackgroundDim() {
	const visible = usePagesVisible();
	const visibility = useSpring(visible ? 0 : 1, {});

	return (
		<Root>
			<frame
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={visibility}
				BorderSizePixel={0}
			>
				<uigradient Transparency={new NumberSequence(1, 0.25)} Rotation={90} />
			</frame>
		</Root>
	);
}

export default pure(BackgroundDim);
