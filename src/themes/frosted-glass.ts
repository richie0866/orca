import { darkTheme } from "themes/dark-theme";
import { Theme, ViewTheme } from "themes/theme.interface";
import { hex } from "utils/color3";

const accent = hex("#000000");
const accentSequence = new ColorSequence(hex("#000000"));

const view: ViewTheme = {
	acrylic: true,
	outlined: true,
	foreground: hex("#ffffff"),
	background: hex("#ffffff"),
	backgroundGradient: undefined,
	transparency: 0.9,
	dropshadow: hex("#ffffff"),
	dropshadowTransparency: 0,
	dropshadowGradient: {
		color: new ColorSequence(hex("#000000")),
		transparency: new NumberSequence(1, 0.8),
		rotation: 90,
	},
};

export const frostedGlass: Theme = {
	...darkTheme,

	name: "Frosted glass",

	preview: {
		foreground: {
			color: new ColorSequence(hex("#ffffff")),
		},
		background: {
			color: new ColorSequence(hex("#ffffff")),
		},
		accent: {
			color: accentSequence,
		},
	},

	navbar: {
		...darkTheme.navbar,
		outlined: true,
		acrylic: true,
		foreground: hex("#ffffff"),
		background: hex("#ffffff"),
		backgroundGradient: undefined,
		transparency: 0.9,
		dropshadow: hex("#000000"),
		dropshadowTransparency: 0.2,
		accentGradient: {
			color: new ColorSequence(hex("#ffffff")),
			transparency: new NumberSequence(0.8),
			rotation: 90,
		},
		glowTransparency: 0.5,
	},

	clock: {
		outlined: true,
		acrylic: true,
		foreground: hex("#ffffff"),
		background: hex("#ffffff"),
		backgroundGradient: undefined,
		transparency: 0.9,
		dropshadow: hex("#000000"),
		dropshadowTransparency: 0.2,
	},

	home: {
		title: {
			...view,
		},
		profile: {
			...view,
			avatar: {
				...darkTheme.home.profile.avatar,
				background: hex("#ffffff"),
				transparency: 0.7,
				gradient: {
					color: new ColorSequence(hex("#ffffff"), hex("#ffffff")),
					transparency: new NumberSequence(0.5, 1),
					rotation: 45,
				},
			},
			highlight: {
				flight: accent,
				walkSpeed: accent,
				jumpHeight: accent,
				refresh: accent,
				ghost: accent,
				godmode: accent,
				freecam: accent,
			},
			slider: {
				...darkTheme.home.profile.slider,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				backgroundTransparency: 0.8,
				indicatorTransparency: 0.3,
			},
			button: {
				...darkTheme.home.profile.button,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				backgroundTransparency: 0.8,
			},
		},
		server: {
			...view,
			rejoinButton: {
				...darkTheme.home.server.rejoinButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				foregroundTransparency: 0.5,
				backgroundTransparency: 0.8,
				accent,
			},
			switchButton: {
				...darkTheme.home.server.switchButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				foregroundTransparency: 0.5,
				backgroundTransparency: 0.8,
				accent,
			},
		},
		friendActivity: {
			...view,
			friendButton: {
				...darkTheme.home.friendActivity.friendButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				dropshadow: hex("#ffffff"),
				backgroundTransparency: 0.7,
			},
		},
	},
	apps: {
		players: {
			...view,
			highlight: {
				teleport: accent,
				hide: accent,
				kill: accent,
				spectate: accent,
			},
			avatar: {
				...darkTheme.apps.players.avatar,
				background: hex("#ffffff"),
				transparency: 0.7,
				gradient: {
					color: new ColorSequence(hex("#ffffff"), hex("#ffffff")),
					transparency: new NumberSequence(0.5, 1),
					rotation: 45,
				},
			},
			button: {
				...darkTheme.apps.players.button,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				backgroundTransparency: 0.8,
			},
			playerButton: {
				...darkTheme.apps.players.playerButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				dropshadow: hex("#ffffff"),
				accent,
				backgroundTransparency: 0.8,
				dropshadowTransparency: 0.7,
			},
		},
	},
	options: {
		config: {
			...view,
			configButton: {
				...darkTheme.options.config.configButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				dropshadow: hex("#ffffff"),
				accent,
				backgroundTransparency: 0.8,
				dropshadowTransparency: 0.7,
			},
		},
		shortcuts: {
			...view,
			shortcutButton: {
				...darkTheme.options.shortcuts.shortcutButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				dropshadow: hex("#ffffff"),
				accent,
				backgroundTransparency: 0.8,
				dropshadowTransparency: 0.7,
			},
		},
		themes: {
			...view,
			themeButton: {
				...darkTheme.options.themes.themeButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
				dropshadow: hex("#ffffff"),
				accent,
				backgroundTransparency: 0.8,
				dropshadowTransparency: 0.7,
			},
		},
	},
};
