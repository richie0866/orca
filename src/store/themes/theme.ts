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
