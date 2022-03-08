export interface ViewTheme {
	outlined?: boolean;
	acrylic: boolean;
	background: Color3;
	foreground: Color3;
	dropshadow: Color3;
	backgroundGradient?: GradientTheme;
	dropshadowGradient?: GradientTheme;
	transparency: number;
	dropshadowTransparency: number;
}

export interface GradientTheme {
	color: ColorSequence;
	transparency?: NumberSequence;
	rotation?: number;
}

export interface ButtonTheme {
	outlined?: boolean;
	background: Color3;
	foreground: Color3;
	backgroundHovered?: Color3;
	foregroundAccent?: Color3;
	accent: Color3;
	foregroundTransparency: number;
	backgroundTransparency: number;
}

export interface Theme {
	name: string;
	preview: {
		background: GradientTheme;
		foreground: GradientTheme;
		accent: GradientTheme;
	};
	navbar: ViewTheme & {
		accentGradient: GradientTheme;
		glowTransparency: number;
	};
	clock: ViewTheme;
	home: {
		title: ViewTheme;
		profile: ViewTheme & {
			avatar: {
				background: Color3;
				gradient: GradientTheme;
				transparency: number;
			};
			button: Omit<ButtonTheme, "accent">;
			slider: Omit<ButtonTheme, "accent"> & {
				indicatorTransparency?: number;
			};
			highlight: {
				flight: Color3;
				walkSpeed: Color3;
				jumpHeight: Color3;
				refresh: Color3;
				ghost: Color3;
				godmode: Color3;
				freecam: Color3;
			};
		};
		server: ViewTheme & {
			rejoinButton: ButtonTheme;
			switchButton: ButtonTheme;
		};
		friendActivity: ViewTheme & {
			friendButton: Omit<ButtonTheme, "backgroundHovered"> & {
				dropshadow: Color3;
				dropshadowTransparency: number;
				glowTransparency: number;
			};
		};
	};
	apps: {
		players: ViewTheme & {
			avatar: {
				background: Color3;
				gradient: GradientTheme;
				transparency: number;
			};
			button: Omit<ButtonTheme, "accent">;
			highlight: {
				teleport: Color3;
				hide: Color3;
				kill: Color3;
				spectate: Color3;
			};
			playerButton: ButtonTheme & {
				dropshadow: Color3;
				dropshadowTransparency: number;
				glowTransparency: number;
			};
		};
	};
	options: {
		themes: ViewTheme & {
			themeButton: ButtonTheme & {
				dropshadow: Color3;
				dropshadowTransparency: number;
				glowTransparency: number;
			};
		};
		shortcuts: ViewTheme & {
			shortcutButton: ButtonTheme & {
				dropshadow: Color3;
				dropshadowTransparency: number;
				glowTransparency: number;
			};
		};
		config: ViewTheme & {
			configButton: ButtonTheme & {
				dropshadow: Color3;
				dropshadowTransparency: number;
				glowTransparency: number;
			};
		};
	};
}
