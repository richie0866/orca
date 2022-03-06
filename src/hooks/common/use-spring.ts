import { Spring } from "@rbxts/flipper";
import Roact, { Binding } from "@rbxts/roact";

import { getBinding, SpringOptions, useMotor, useSpring as useNumberSpring } from "hooks/common/flipper-hooks";

const supportedTypes = {
	number: useNumberSpring,

	Color3: (color: Color3, options: SpringOptions): Binding<Color3> => {
		const motor = useMotor([color.R, color.G, color.B]);
		motor.setGoal([new Spring(color.R, options), new Spring(color.G, options), new Spring(color.B, options)]);
		return getBinding(motor).map(([r, g, b]) => new Color3(r, g, b));
	},

	UDim: (udim: UDim, options: SpringOptions): Binding<UDim> => {
		const motor = useMotor([udim.Scale, udim.Offset]);
		motor.setGoal([new Spring(udim.Scale, options), new Spring(udim.Offset, options)]);
		return getBinding(motor).map(([s, o]) => new UDim(s, o));
	},

	UDim2: (udim2: UDim2, options: SpringOptions): Binding<UDim2> => {
		const motor = useMotor([udim2.X.Scale, udim2.X.Offset, udim2.Y.Scale, udim2.Y.Offset]);
		motor.setGoal([
			new Spring(udim2.X.Scale, options),
			new Spring(udim2.X.Offset, options),
			new Spring(udim2.Y.Scale, options),
			new Spring(udim2.Y.Offset, options),
		]);
		return getBinding(motor).map(([xS, xO, yS, yO]) => new UDim2(xS, math.round(xO), yS, math.round(yO)));
	},

	Vector2: (vector2: Vector2, options: SpringOptions): Binding<Vector2> => {
		const motor = useMotor([vector2.X, vector2.Y]);
		motor.setGoal([new Spring(vector2.X, options), new Spring(vector2.Y, options)]);
		return getBinding(motor).map(([X, Y]) => new Vector2(X, Y));
	},
};

export function useSpring<T extends CheckableTypes[keyof typeof supportedTypes]>(
	value: T,
	options?: SpringOptions,
): Binding<T> {
	if (!options) {
		return Roact.createBinding(value)[0];
	}
	const useSpring = supportedTypes[typeOf(value) as keyof typeof supportedTypes];
	assert(useSpring, `useAnySpring: ${typeOf(value)} is not supported`);
	return useSpring(value as never, options) as Binding<T>;
}
