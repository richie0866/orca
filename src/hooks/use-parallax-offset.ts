import { Spring } from "@rbxts/flipper";
import Roact from "@rbxts/roact";
import { getBinding, useMotor } from "hooks/common/flipper-hooks";
import { useMouseLocation } from "hooks/common/use-mouse-location";
import { useViewportSize } from "hooks/common/use-viewport-size";

export function useParallaxOffset() {
	const mouseLocationMotor = useMotor([0, 0]);
	const mouseLocation = getBinding(mouseLocationMotor);
	const viewportSize = useViewportSize();

	const offset = Roact.joinBindings({ viewportSize, mouseLocation }).map(
		({ viewportSize, mouseLocation: [x, y] }) => {
			return new Vector2((x - viewportSize.X / 2) / viewportSize.X, (y - viewportSize.Y / 2) / viewportSize.Y);
		},
	);

	useMouseLocation((location) => {
		mouseLocationMotor.setGoal([
			new Spring(location.X, { dampingRatio: 5 }),
			new Spring(location.Y, { dampingRatio: 5 }),
		]);
	});

	return offset;
}
