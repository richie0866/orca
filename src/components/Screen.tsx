import Roact from "@rbxts/roact";
import { RunService } from "@rbxts/services";

import { ORCA_DISPLAY_ORDER } from "constants";

interface Props extends Roact.PropsWithChildren {
	displayOrder?: number;
}

export default function Screen({ displayOrder = 0, [Roact.Children]: children }: Props) {
	if (!RunService.IsRunning()) {
		return (
			<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
				{children}
			</frame>
		);
	}

	return (
		<screengui
			IgnoreGuiInset
			ResetOnSpawn={false}
			ZIndexBehavior="Sibling"
			DisplayOrder={ORCA_DISPLAY_ORDER + displayOrder}
		>
			{children}
		</screengui>
	);
}
