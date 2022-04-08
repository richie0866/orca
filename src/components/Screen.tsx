import Roact from "@rbxts/roact";
import { ORCA_DISPLAY_ORDER } from "constants";

interface Props extends Roact.PropsWithChildren {
	zIndex?: number;
}

export default function Screen({ zIndex = 0, [Roact.Children]: children }: Props) {
	return (
		<screengui
			IgnoreGuiInset
			ResetOnSpawn={false}
			ZIndexBehavior="Sibling"
			DisplayOrder={ORCA_DISPLAY_ORDER + zIndex}
		>
			{children}
		</screengui>
	);
}
