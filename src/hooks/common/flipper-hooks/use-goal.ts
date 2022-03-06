import { Instant, Linear, Spring } from "@rbxts/flipper";
import type Roact from "@rbxts/roact";

import { getBinding } from "hooks/common/flipper-hooks/get-binding";
import { useMotor } from "hooks/common/flipper-hooks/use-motor";

type Goal = (Spring | Linear | Instant) & {
	/** @ignore */
	_targetValue?: number;
};

export function useGoal(goal: Goal): Roact.Binding<number> {
	const motor = useMotor(goal._targetValue!);
	motor.setGoal(goal);
	return getBinding(motor);
}
