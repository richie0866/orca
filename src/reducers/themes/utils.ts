import { GradientColor, SolidColor } from "./model";

export function isGradient(color?: GradientColor | SolidColor): color is GradientColor {
	if (!color) {
		return false;
	}
	return typeIs(color.color, "ColorSequence") || typeIs(color.transparency, "NumberSequence");
}

export function isSolid(color?: GradientColor | SolidColor): color is SolidColor {
	if (!color) {
		return false;
	}
	return typeIs(color.color, "Color3") || typeIs(color.transparency, "number");
}

export function asColor(color?: SolidColor | GradientColor): Color3 {
	if (isSolid(color)) {
		return color.color || new Color3(1, 1, 1);
	}
	return new Color3(1, 1, 1);
}

export function asColorSequence(color?: SolidColor | GradientColor): ColorSequence {
	if (isGradient(color)) {
		return color.color || new ColorSequence(new Color3());
	}
	return new ColorSequence(new Color3());
}

export function asTransparency(color?: SolidColor | GradientColor): number {
	if (isSolid(color)) {
		return color.transparency ?? 0;
	}
	return 0;
}

export function asTransparencySequence(color?: SolidColor | GradientColor): NumberSequence {
	if (isGradient(color)) {
		return color.transparency || new NumberSequence(0);
	}
	return new NumberSequence(0);
}

export function multiplyTransparency(n: number, ...rest: number[]): number {
	//return 1 - (1 - a) * (1 - b);
	return rest.reduce((a, b) => 1 - (1 - a) * (1 - b), n);
}
