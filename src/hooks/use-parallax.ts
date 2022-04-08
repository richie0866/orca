import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { UserInputService } from "@rbxts/services";
import { useEvent, useGroupMotor, useViewportSize } from "@rbxts/roact-hooked-plus";

export function useParallax() {
	const viewportSize = useViewportSize();
	const [mouseLocation, setGoal] = useGroupMotor([0, 0]);

	const offset = Roact.joinBindings({ viewportSize, mouseLocation }).map(
		({ viewportSize, mouseLocation: [x, y] }) => {
			return new Vector2((x - viewportSize.X / 2) / viewportSize.X, (y - viewportSize.Y / 2) / viewportSize.Y);
		},
	);

	useEvent(UserInputService.InputChanged, (input) => {
		if (input.UserInputType === Enum.UserInputType.MouseMovement) {
			setGoal([
				new Spring(input.Position.X, { dampingRatio: 5 }),
				new Spring(input.Position.Y, { dampingRatio: 5 }),
			]);
		}
	});

	return offset;
}
