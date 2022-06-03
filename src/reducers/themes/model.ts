export interface ThemesState {
	currentTheme: string;
}

export type FilterCardThemes = Pick<Theme, { [K in keyof Theme]: Theme[K] extends CardStyle ? K : never }[keyof Theme]>;

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

export interface SliderStyle {
	slider?: GradientColor | SolidColor;
	background?: GradientColor | SolidColor;
	foreground?: GradientColor | SolidColor;
	dropshadow?: GradientColor | SolidColor;
	glow?: GradientColor | SolidColor;
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
	profile: CardStyle & {
		headshot: Omit<CardStyle, "dropshadow">;
		sliders: {
			flightspeed: SliderStyle;
			walkspeed: SliderStyle;
			jumpheight: SliderStyle;
		};
		switches: {
			flightspeed: ButtonStyle;
			walkspeed: ButtonStyle;
			jumpheight: ButtonStyle;
			respawn: ButtonStyle;
			ghostmode: ButtonStyle;
			godmode: ButtonStyle;
			freecam: ButtonStyle;
		};
	};
	session: CardStyle;
	server: CardStyle;
	games: CardStyle & {
		gameCard: {
			skeleton: {
				from: SolidColor;
				to: SolidColor;
			};
			dropshadow: GradientColor | SolidColor;
			stroke?: GradientColor | SolidColor;
			cornerRadius?: UDim;
		};
	};

	players: CardStyle;

	config: CardStyle;
	shortcuts: CardStyle;
	themes: CardStyle;
}
