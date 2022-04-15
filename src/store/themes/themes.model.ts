export interface ThemesState {
	currentTheme: string;
}

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
		button: Omit<ButtonStyle, "background" | "dropshadow" | "stroke" | "cornerRadius">;
	};
	clock: CardStyle;
	title: CardStyle;
	profile: CardStyle;
	server: CardStyle;
	friends: CardStyle;
}
