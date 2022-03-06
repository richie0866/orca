import { GroupMotor, isMotor, SingleMotor } from "@rbxts/flipper";
import { Binding, createBinding } from "@rbxts/roact";

const AssignedBinding = setmetatable({}, { __tostring: () => "AssignedBinding" }) as symbol;

export function getBinding<T>(motor: SingleMotor | GroupMotor<T>): T extends undefined ? Binding<number> : Binding<T>;
export function getBinding(motor: SingleMotor | GroupMotor<number>): Binding<number> {
	assert(motor, "Missing argument #1: motor");
	assert(isMotor(motor), "Provided value is not a motor");

	if (AssignedBinding in motor) {
		return motor[AssignedBinding as never];
	}

	const [binding, setBindingValue] = createBinding(motor.getValue());
	motor.onStep(setBindingValue);

	motor[AssignedBinding as never] = binding as never;
	return binding;
}
