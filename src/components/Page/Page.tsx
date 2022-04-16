import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import Screen from "components/Screen";
import { HEIGHT as NAVBAR_HEIGHT } from "features/Navbar";
import { SCREEN_MARGIN } from "constants";
import { useMargin } from "hooks/use-margin";
import { useScale } from "hooks/use-scale";

function Page(props: Roact.PropsWithChildren) {
	const scale = useScale();
	const margin = useMargin();

	return (
		<Screen>
			<frame
				Size={new UDim2(1, -SCREEN_MARGIN * 2, 1, -SCREEN_MARGIN - NAVBAR_HEIGHT)}
				Position={new UDim2(0, SCREEN_MARGIN, 0, SCREEN_MARGIN)}
				BackgroundTransparency={1}
			>
				<frame
					AnchorPoint={new Vector2(0.5, 1)}
					Size={scale.map((s) => new UDim2(1 / s, 0, 1, 0))}
					Position={new UDim2(0.5, 0, 1, 0)}
					BackgroundTransparency={1}
				>
					<uiscale Scale={scale} />

					{props[Roact.Children]}
				</frame>

				<uipadding PaddingBottom={margin.map((m) => new UDim(0, m * 2))} />
			</frame>
		</Screen>
	);
}

export default pure(Page);
