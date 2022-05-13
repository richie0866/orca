import Roact from "@rbxts/roact";
import { DISPLAY_ORDER } from "constants/app";
import { IS_RUNNING } from "constants/env";

interface Props extends Roact.PropsWithChildren {
	displayOrder?: number;
}

export default function Screen({ displayOrder = 0, [Roact.Children]: children }: Props) {
	if (!IS_RUNNING) {
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
			DisplayOrder={DISPLAY_ORDER + displayOrder}
		>
			{children}
		</screengui>
	);
}
