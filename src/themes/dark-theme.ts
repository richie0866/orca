import { Theme } from "themes/theme.interface";
import { hex } from "utils/color3";

export const darkTheme: Theme = {
	name: "Dark theme",

	preview: {
		foreground: {
			color: new ColorSequence(hex("#ffffff")),
		},
		background: {
			color: new ColorSequence(hex("#232428")),
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
		outlined: true,
		acrylic: false,

		foreground: hex("#ffffff"),
		background: hex("#232428"),
		transparency: 0,

		accentGradient: {
			color: new ColorSequence([
				new ColorSequenceKeypoint(0, hex("#f629c6")),
				new ColorSequenceKeypoint(0.25, hex("#F64229")),
				new ColorSequenceKeypoint(0.5, hex("#ffd42a")),
				new ColorSequenceKeypoint(0.75, hex("#37CC95")),
				new ColorSequenceKeypoint(1, hex("#3789cc")),
			]),
		},
		dropshadow: hex("#232428"),
		dropshadowTransparency: 0.3,
		glowTransparency: 0,
	},

	clock: {
		outlined: true,
		acrylic: false,

		foreground: hex("#ffffff"),
		background: hex("#232428"),
		transparency: 0,

		dropshadow: hex("#232428"),
		dropshadowTransparency: 0.3,
	},

	home: {
		title: {
			outlined: true,
			acrylic: false,

			foreground: hex("#ffffff"),
			background: hex("#ffffff"),
			backgroundGradient: {
				color: new ColorSequence([
					new ColorSequenceKeypoint(0, hex("#F6BD29")),
					new ColorSequenceKeypoint(0.5, hex("#F64229")),
					new ColorSequenceKeypoint(1, hex("#9029F6")),
				]),
				rotation: 25,
			},
			transparency: 0,

			dropshadow: hex("#ffffff"),
			dropshadowGradient: {
				color: new ColorSequence([
					new ColorSequenceKeypoint(0, hex("#F6BD29")),
					new ColorSequenceKeypoint(0.5, hex("#F64229")),
					new ColorSequenceKeypoint(1, hex("#9029F6")),
				]),
				rotation: 25,
			},
			dropshadowTransparency: 0.3,
		},

		profile: {
			outlined: true,
			acrylic: false,

			foreground: hex("#ffffff"),
			background: hex("#232428"),
			transparency: 0,

			dropshadow: hex("#232428"),
			dropshadowTransparency: 0.3,

			avatar: {
				background: hex("#1B1C20"),
				gradient: {
					color: new ColorSequence([
						new ColorSequenceKeypoint(0, hex("#F6BD29")),
						new ColorSequenceKeypoint(0.5, hex("#F64229")),
						new ColorSequenceKeypoint(1, hex("#9029F6")),
					]),
					rotation: 25,
				},
				transparency: 0,
			},

			button: {
				outlined: true,

				foreground: hex("#ffffff"),
				foregroundTransparency: 0.5,

				background: hex("#1B1C20"),
				backgroundTransparency: 0,
			},

			slider: {
				outlined: true,

				foreground: hex("#ffffff"),
				foregroundTransparency: 0,

				background: hex("#1B1C20"),
				backgroundTransparency: 0,
			},

			highlight: {
				flight: hex("#a22df0"),
				walkSpeed: hex("#EC423D"),
				jumpHeight: hex("#37CC95"),
				refresh: hex("#a22df0"),
				ghost: hex("#FF4040"),
				godmode: hex("#f09c2d"),
				freecam: hex("#37CC95"),
			},
		},

		server: {
			outlined: true,
			acrylic: false,

			foreground: hex("#ffffff"),
			background: hex("#37CC95"),
			transparency: 0,

			dropshadow: hex("#37CC95"),
			dropshadowTransparency: 0.3,

			rejoinButton: {
				outlined: true,
				foreground: hex("#ffffff"),
				background: hex("#37CC95"),
				accent: hex("#232428"),
				foregroundTransparency: 0,
				backgroundTransparency: 0,
			},

			switchButton: {
				outlined: true,
				foreground: hex("#ffffff"),
				background: hex("#37CC95"),
				accent: hex("#232428"),
				foregroundTransparency: 0,
				backgroundTransparency: 0,
			},
		},

		friendActivity: {
			outlined: true,
			acrylic: false,

			foreground: hex("#ffffff"),
			background: hex("#232428"),
			transparency: 0,

			dropshadow: hex("#232428"),
			dropshadowTransparency: 0.3,

			friendButton: {
				outlined: true,

				accent: hex("#37CC95"),

				foreground: hex("#ffffff"),
				foregroundTransparency: 0,

				background: hex("#1B1C20"),
				backgroundTransparency: 0,

				dropshadow: hex("#000000"),
				dropshadowTransparency: 0.4,
				glowTransparency: 0.6,
			},
		},
	},

	apps: {
		players: {
			outlined: true,
			acrylic: false,

			foreground: hex("#ffffff"),
			background: hex("#232428"),
			transparency: 0,

			dropshadow: hex("#232428"),
			dropshadowTransparency: 0.3,

			avatar: {
				background: hex("#1B1C20"),
				gradient: {
					color: new ColorSequence([
						new ColorSequenceKeypoint(0, hex("#37CC95")),
						new ColorSequenceKeypoint(1, hex("#37CC95")),
					]),
					rotation: 25,
				},
				transparency: 0,
			},

			button: {
				outlined: true,

				foreground: hex("#ffffff"),
				foregroundTransparency: 0.5,

				background: hex("#1B1C20"),
				backgroundTransparency: 0,
			},

			highlight: {
				teleport: hex("#37CC95"),
				hide: hex("#f09c2d"),
				kill: hex("#EC423D"),
				spectate: hex("#a22df0"),
			},

			playerButton: {
				outlined: true,

				accent: hex("#37CC95"),

				foreground: hex("#ffffff"),
				foregroundTransparency: 0.5,

				background: hex("#1B1C20"),
				backgroundTransparency: 0,

				dropshadow: hex("#000000"),
				dropshadowTransparency: 0.5,
				glowTransparency: 0.2,
			},
		},
	},

	options: {
		themes: {
			outlined: true,
			acrylic: false,

			foreground: hex("#ffffff"),
			background: hex("#232428"),
			transparency: 0,

			dropshadow: hex("#232428"),
			dropshadowTransparency: 0.3,

			themeButton: {
				outlined: true,

				accent: hex("#37a4cc"),

				foreground: hex("#ffffff"),
				foregroundTransparency: 0.5,

				background: hex("#1B1C20"),
				backgroundTransparency: 0,

				dropshadow: hex("#000000"),
				dropshadowTransparency: 0.5,
				glowTransparency: 0.2,
			},
		},

		shortcuts: {
			outlined: true,
			acrylic: false,

			foreground: hex("#ffffff"),
			background: hex("#232428"),
			transparency: 0,

			dropshadow: hex("#232428"),
			dropshadowTransparency: 0.3,

			shortcutButton: {
				outlined: true,

				accent: hex("#37CC95"),

				foreground: hex("#ffffff"),
				foregroundTransparency: 0.5,

				background: hex("#1B1C20"),
				backgroundTransparency: 0,

				dropshadow: hex("#000000"),
				dropshadowTransparency: 0.5,
				glowTransparency: 0.2,
			},
		},

		config: {
			outlined: true,
			acrylic: false,

			foreground: hex("#ffffff"),
			background: hex("#232428"),
			transparency: 0,

			dropshadow: hex("#232428"),
			dropshadowTransparency: 0.3,

			configButton: {
				outlined: true,

				accent: hex("#37CC95"),

				foreground: hex("#ffffff"),
				foregroundTransparency: 0.5,

				background: hex("#1B1C20"),
				backgroundTransparency: 0,

				dropshadow: hex("#000000"),
				dropshadowTransparency: 0.5,
				glowTransparency: 0.2,
			},
		},
	},
};
