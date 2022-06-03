import Roact from "@rbxts/roact";
import { DISPLAY_ORDER } from "constants/app";
import { getTarget } from "./get-target";
import { pure } from "@rbxts/roact-hooked";

interface Props extends Roact.PropsWithChildren {
	order?: number;
}

function Root({ order = 0, [Roact.Children]: children }: Props) {
	return (
		<Roact.Portal target={getTarget()}>
			<screengui
				IgnoreGuiInset
				ResetOnSpawn={false}
				ZIndexBehavior="Sibling"
				DisplayOrder={DISPLAY_ORDER + order}
			>
				{children}
			</screengui>
		</Roact.Portal>
	);
}

export default pure(Root);
