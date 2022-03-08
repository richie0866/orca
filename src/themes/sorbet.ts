import { darkTheme } from "themes/dark-theme";
import { Theme, ViewTheme } from "themes/theme.interface";
import { hex } from "utils/color3";

const redAccent = hex("#C6428E");
const blueAccent = hex("#484fd7");
const mixedAccent = hex("#9a3fe5");
const accentSequence = new ColorSequence([
	new ColorSequenceKeypoint(0, redAccent),
	new ColorSequenceKeypoint(0.5, mixedAccent),
	new ColorSequenceKeypoint(1, blueAccent),
]);

const background = hex("#181818");
const backgroundDark = hex("#242424");

const view: ViewTheme = {
	acrylic: false,
	outlined: false,
	foreground: hex("#ffffff"),
	background: background,
	backgroundGradient: undefined,
	transparency: 0,
	dropshadow: background,
	dropshadowTransparency: 0.3,
};

export const sorbet: Theme = {
	...darkTheme,

	name: "Sorbet",

	preview: {
		foreground: {
			color: new ColorSequence(hex("#ffffff")),
		},
		background: {
			color: new ColorSequence(background),
		},
		accent: {
			color: accentSequence,
		},
	},

	navbar: {
		...darkTheme.navbar,
		outlined: false,
		background: background,
		dropshadow: background,
		accentGradient: {
			color: accentSequence,
		},
	},

	clock: {
		...darkTheme.clock,
		outlined: false,
		background: background,
		dropshadow: background,
	},

	home: {
		title: {
			...view,
			background: hex("#ffffff"),
			backgroundGradient: {
				color: accentSequence,
				rotation: 30,
			},
			dropshadow: hex("#ffffff"),
			dropshadowGradient: {
				color: accentSequence,
				rotation: 30,
			},
		},
		profile: {
			...view,
			avatar: {
				...darkTheme.home.profile.avatar,
				background: backgroundDark,
				transparency: 0,
				gradient: {
					color: accentSequence,
					rotation: 45,
				},
			},
			highlight: {
				flight: redAccent,
				walkSpeed: mixedAccent,
				jumpHeight: blueAccent,
				refresh: redAccent,
				ghost: blueAccent,
				godmode: redAccent,
				freecam: blueAccent,
			},
			slider: {
				...darkTheme.home.profile.slider,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
			},
			button: {
				...darkTheme.home.profile.button,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
			},
		},
		server: {
			...view,
			rejoinButton: {
				...darkTheme.home.server.rejoinButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
				foregroundTransparency: 0.5,
				accent: redAccent,
			},
			switchButton: {
				...darkTheme.home.server.switchButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
				foregroundTransparency: 0.5,
				accent: blueAccent,
			},
		},
		friendActivity: {
			...view,
			friendButton: {
				...darkTheme.home.friendActivity.friendButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
			},
		},
	},
	apps: {
		players: {
			...view,
			highlight: {
				teleport: redAccent,
				hide: blueAccent,
				kill: redAccent,
				spectate: blueAccent,
			},
			avatar: {
				...darkTheme.apps.players.avatar,
				background: backgroundDark,
				transparency: 0,
				gradient: {
					color: accentSequence,
					rotation: 45,
				},
			},
			button: {
				...darkTheme.apps.players.button,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
			},
			playerButton: {
				...darkTheme.apps.players.playerButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
				dropshadow: backgroundDark,
				accent: blueAccent,
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
				background: backgroundDark,
				dropshadow: backgroundDark,
				accent: redAccent,
			},
		},
		shortcuts: {
			...view,
			shortcutButton: {
				...darkTheme.options.shortcuts.shortcutButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
				dropshadow: backgroundDark,
				accent: mixedAccent,
			},
		},
		themes: {
			...view,
			themeButton: {
				...darkTheme.options.themes.themeButton,
				outlined: false,
				foreground: hex("#ffffff"),
				background: backgroundDark,
				dropshadow: backgroundDark,
				accent: blueAccent,
			},
		},
	},
};
