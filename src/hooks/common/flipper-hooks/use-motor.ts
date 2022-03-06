import { GroupMotor, SingleMotor } from "@rbxts/flipper";
import { useMutable } from "@rbxts/roact-hooked/out/hooks";

// Overload bc it messes up implementation
function createMotor<T extends number | Array<number> | Record<string, number>>(
	initialValue: T,
): T extends number ? SingleMotor : GroupMotor<T>;
function createMotor<T extends number | Array<number> | Record<string, number>>(
	initialValue: T,
): SingleMotor | GroupMotor<T> {
	if (typeIs(initialValue, "number")) {
		return new SingleMotor(initialValue);
	} else if (typeIs(initialValue, "table")) {
		return new GroupMotor(initialValue);
	} else {
		throw `Invalid type for initialValue. Expected 'number' or 'table', got '${initialValue}'`;
	}
}

export function useMotor<T extends number | Array<number> | Record<string, number>>(
	initialValue: T,
): T extends number ? SingleMotor : GroupMotor<T> {
	return useMutable(createMotor(initialValue)).current;
}
