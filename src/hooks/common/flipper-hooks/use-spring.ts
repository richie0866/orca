import { Spring } from "@rbxts/flipper";
import type Roact from "@rbxts/roact";

import { useGoal } from "hooks/common/flipper-hooks/use-goal";

export type SpringOptions = ConstructorParameters<typeof Spring>[1];

export function useSpring(targetValue: number, options: SpringOptions): Roact.Binding<number> {
	return useGoal(new Spring(targetValue, options));
}
