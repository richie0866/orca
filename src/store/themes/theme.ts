export interface GradientColor {
	color?: ColorSequence;
	transparency?: NumberSequence;
	rotation?: number;
}

export interface SolidColor {
	color?: Color3;
	transparency?: number;
}

export interface ButtonStyle {
	background?: GradientColor | SolidColor;
	foreground?: GradientColor | SolidColor;
	dropshadow?: GradientColor | SolidColor;
	stroke?: GradientColor | SolidColor;
	cornerRadius?: UDim;

	$hover?: Partial<ButtonStyle>;
	$active?: Partial<ButtonStyle>;
}

export interface CardStyle {
	background: GradientColor | SolidColor;
	foreground: GradientColor | SolidColor;
	dropshadow: GradientColor | SolidColor;
	stroke?: GradientColor | SolidColor;
	cornerRadius?: UDim;
	button: Omit<ButtonStyle, "background" | "dropshadow" | "stroke" | "cornerRadius">;
}

export interface Theme {
	name: string;
	navbar: CardStyle & {
		accent: GradientColor;
	};
}

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
