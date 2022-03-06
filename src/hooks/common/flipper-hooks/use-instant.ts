import { Instant } from "@rbxts/flipper";
import type Roact from "@rbxts/roact";

import { useGoal } from "hooks/common/flipper-hooks/use-goal";

export function useInstant(targetValue: number): Roact.Binding<number> {
	return useGoal(new Instant(targetValue));
}
