import { darkTheme } from "themes/dark-theme";
import { Theme } from "themes/theme.interface";
import { hex } from "utils/color3";

export const highContrast: Theme = {
	...darkTheme,

	name: "High contrast",

	preview: {
		foreground: {
			color: new ColorSequence(hex("#ffffff")),
		},
		background: {
			color: new ColorSequence(hex("#000000")),
		},
		accent: {
			color: new ColorSequence([
				new ColorSequenceKeypoint(0, hex("#F6BD29")),
				new ColorSequenceKeypoint(0.5, hex("#F64229")),
				new ColorSequenceKeypoint(1, hex("#9029F6")),
			]),
			rotation: 25,
		},
	},

	navbar: {
		...darkTheme.navbar,
		foreground: hex("#ffffff"),
		background: hex("#000000"),
		dropshadow: hex("#000000"),
	},

	clock: {
		...darkTheme.clock,
		foreground: hex("#ffffff"),
		background: hex("#000000"),
		dropshadow: hex("#000000"),
	},

	home: {
		title: {
			...darkTheme.home.title,
			foreground: hex("#ffffff"),
			background: hex("#000000"),
			dropshadow: hex("#000000"),
		},
		profile: {
			...darkTheme.home.profile,
			foreground: hex("#ffffff"),
			background: hex("#000000"),
			dropshadow: hex("#000000"),
			avatar: {
				...darkTheme.home.profile.avatar,
				background: hex("#ffffff"),
				transparency: 0.9,
				gradient: {
					color: new ColorSequence([
						new ColorSequenceKeypoint(0, hex("#F6BD29")),
						new ColorSequenceKeypoint(0.5, hex("#F64229")),
						new ColorSequenceKeypoint(1, hex("#9029F6")),
					]),
				},
			},
			slider: {
				...darkTheme.home.profile.slider,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
			},
			button: {
				...darkTheme.home.profile.button,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
			},
		},
		server: {
			...darkTheme.home.server,
			foreground: hex("#ffffff"),
			background: hex("#000000"),
			dropshadow: hex("#000000"),
			rejoinButton: {
				...darkTheme.home.server.rejoinButton,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
				foregroundTransparency: 0.5,
				accent: hex("#ff3f6c"),
			},
			switchButton: {
				...darkTheme.home.server.switchButton,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
				foregroundTransparency: 0.5,
				accent: hex("#ff3f6c"),
			},
		},
		friendActivity: {
			...darkTheme.home.friendActivity,
			foreground: hex("#ffffff"),
			background: hex("#000000"),
			dropshadow: hex("#000000"),
			friendButton: {
				...darkTheme.home.friendActivity.friendButton,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
			},
		},
	},
	apps: {
		players: {
			...darkTheme.apps.players,
			foreground: hex("#ffffff"),
			background: hex("#000000"),
			dropshadow: hex("#000000"),
			avatar: {
				...darkTheme.apps.players.avatar,
				background: hex("#ffffff"),
				transparency: 0.9,
				gradient: {
					color: new ColorSequence([
						new ColorSequenceKeypoint(0, hex("#F6BD29")),
						new ColorSequenceKeypoint(0.5, hex("#F64229")),
						new ColorSequenceKeypoint(1, hex("#9029F6")),
					]),
				},
			},
			button: {
				...darkTheme.apps.players.button,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
			},
			playerButton: {
				...darkTheme.apps.players.playerButton,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
				accent: hex("#ff3f6c"),
				dropshadowTransparency: 0.7,
			},
		},
	},
	options: {
		config: {
			...darkTheme.options.config,
			foreground: hex("#ffffff"),
			background: hex("#000000"),
			dropshadow: hex("#000000"),
			configButton: {
				...darkTheme.options.config.configButton,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
				accent: hex("#ff3f6c"),
				dropshadowTransparency: 0.7,
			},
		},
		shortcuts: {
			...darkTheme.options.shortcuts,
			foreground: hex("#ffffff"),
			background: hex("#000000"),
			dropshadow: hex("#000000"),
			shortcutButton: {
				...darkTheme.options.shortcuts.shortcutButton,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
				accent: hex("#ff3f6c"),
				dropshadowTransparency: 0.7,
			},
		},
		themes: {
			...darkTheme.options.themes,
			foreground: hex("#ffffff"),
			background: hex("#000000"),
			dropshadow: hex("#000000"),
			themeButton: {
				...darkTheme.options.themes.themeButton,
				foreground: hex("#ffffff"),
				background: hex("#000000"),
				accent: hex("#ff3f6c"),
				dropshadowTransparency: 0.7,
			},
		},
	},
};
