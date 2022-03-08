import { darkTheme } from "themes/dark-theme";
import { Theme } from "themes/theme.interface";
import { hex } from "utils/color3";

export const lightTheme: Theme = {
	...darkTheme,

	name: "Light theme",

	preview: {
		foreground: {
			color: new ColorSequence(hex("#000000")),
		},
		background: {
			color: new ColorSequence(hex("#ffffff")),
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
		foreground: hex("#000000"),
		background: hex("#ffffff"),
	},

	clock: {
		...darkTheme.clock,
		foreground: hex("#000000"),
		background: hex("#ffffff"),
	},

	home: {
		title: {
			...darkTheme.home.title,
			foreground: hex("#000000"),
			background: hex("#ffffff"),
		},
		profile: {
			...darkTheme.home.profile,
			foreground: hex("#000000"),
			background: hex("#ffffff"),
			avatar: {
				...darkTheme.home.profile.avatar,
				background: hex("#000000"),
				transparency: 0.9,
				gradient: {
					color: new ColorSequence(hex("#3ce09b")),
				},
			},
			slider: {
				...darkTheme.home.profile.slider,
				foreground: hex("#000000"),
				background: hex("#ffffff"),
			},
			button: {
				...darkTheme.home.profile.button,
				foreground: hex("#000000"),
				background: hex("#ffffff"),
			},
		},
		server: {
			...darkTheme.home.server,
			foreground: hex("#000000"),
			background: hex("#ff3f6c"),
			dropshadow: hex("#ff3f6c"),
			rejoinButton: {
				...darkTheme.home.server.rejoinButton,
				foreground: hex("#000000"),
				background: hex("#ff3f6c"),
				accent: hex("#ffffff"),
			},
			switchButton: {
				...darkTheme.home.server.switchButton,
				foreground: hex("#000000"),
				background: hex("#ff3f6c"),
				accent: hex("#ffffff"),
			},
		},
		friendActivity: {
			...darkTheme.home.friendActivity,
			foreground: hex("#000000"),
			background: hex("#ffffff"),
			friendButton: {
				...darkTheme.home.friendActivity.friendButton,
				foreground: hex("#ffffff"),
				background: hex("#ffffff"),
			},
		},
	},
	apps: {
		players: {
			...darkTheme.apps.players,
			foreground: hex("#000000"),
			background: hex("#ffffff"),
			avatar: {
				...darkTheme.apps.players.avatar,
				background: hex("#000000"),
				transparency: 0.9,
				gradient: {
					color: new ColorSequence(hex("#3ce09b")),
				},
			},
			button: {
				...darkTheme.apps.players.button,
				foreground: hex("#000000"),
				background: hex("#ffffff"),
			},
			playerButton: {
				...darkTheme.apps.players.playerButton,
				foreground: hex("#000000"),
				background: hex("#ffffff"),
				backgroundHovered: hex("#eeeeee"),
				accent: hex("#3ce09b"),
				dropshadowTransparency: 0.7,
			},
		},
	},
	options: {
		config: {
			...darkTheme.options.config,
			foreground: hex("#000000"),
			background: hex("#ffffff"),
			configButton: {
				...darkTheme.options.config.configButton,
				foreground: hex("#000000"),
				background: hex("#ffffff"),
				backgroundHovered: hex("#eeeeee"),
				accent: hex("#3ce09b"),
				dropshadowTransparency: 0.7,
			},
		},
		shortcuts: {
			...darkTheme.options.shortcuts,
			foreground: hex("#000000"),
			background: hex("#ffffff"),
			shortcutButton: {
				...darkTheme.options.shortcuts.shortcutButton,
				foreground: hex("#000000"),
				background: hex("#ffffff"),
				backgroundHovered: hex("#eeeeee"),
				accent: hex("#3ce09b"),
				dropshadowTransparency: 0.7,
			},
		},
		themes: {
			...darkTheme.options.themes,
			foreground: hex("#000000"),
			background: hex("#ffffff"),
			themeButton: {
				...darkTheme.options.themes.themeButton,
				foreground: hex("#000000"),
				background: hex("#ffffff"),
				backgroundHovered: hex("#eeeeee"),
				accent: hex("#3ce09b"),
				dropshadowTransparency: 0.7,
			},
		},
	},
};
