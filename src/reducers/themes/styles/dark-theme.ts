import { ButtonStyle, CardStyle, SliderStyle, Theme } from "../model";

const pink = Color3.fromHex("#C6428E");
const blue = Color3.fromHex("#484fd7");
const purple = Color3.fromHex("#9a3fe5");

const foreground = Color3.fromHex("#fafafa");
const background = Color3.fromHex("#181818");
const backgroundLight = Color3.fromHex("#242424");
const backgroundLighter = Color3.fromHex("#323232");
const dropshadow = Color3.fromHex("#000000");

const gradient = new ColorSequence([
	new ColorSequenceKeypoint(0, pink),
	new ColorSequenceKeypoint(0.5, purple),
	new ColorSequenceKeypoint(1, blue),
]);

const cornerRadius = new UDim(0, 8);

const cardStyle: CardStyle = {
	background: { color: background },
	foreground: { color: foreground },
	dropshadow: { color: dropshadow, transparency: 0.4 },
	cornerRadius,
};

const buttonStyle: ButtonStyle = {
	background: { color: backgroundLight },
	foreground: { color: foreground, transparency: 0.5 },
	dropshadow: { color: dropshadow, transparency: 0.75 },
	cornerRadius,
	$active: {
		background: { color: pink },
		foreground: { color: foreground, transparency: 0 },
		dropshadow: { color: pink, transparency: 0 },
	},
	$hover: {
		background: { color: backgroundLighter },
		foreground: { color: foreground, transparency: 0 },
	},
};

const sliderStyle: SliderStyle = {
	slider: { color: pink },
	background: { color: backgroundLight },
	foreground: { color: foreground, transparency: 0.25 },
	dropshadow: { color: dropshadow, transparency: 0.75 },
	glow: { color: pink, transparency: 0 },
	cornerRadius,
	$hover: {
		background: { color: backgroundLighter },
		foreground: { color: foreground, transparency: 0 },
	},
};

export const darkTheme: Theme = {
	name: "Dark theme",

	navbar: {
		...cardStyle,
		accent: { color: gradient },

		button: {
			foreground: { color: foreground, transparency: 0.7 },
			$active: {
				foreground: { color: foreground, transparency: 0 },
			},
			$hover: {
				foreground: { color: foreground, transparency: 0.5 },
			},
		},
	},

	clock: cardStyle,

	title: {
		...cardStyle,
		background: { color: gradient, rotation: 30 },
		dropshadow: {
			color: new ColorSequence([
				new ColorSequenceKeypoint(0, pink),
				new ColorSequenceKeypoint(0.5, purple),
				new ColorSequenceKeypoint(0.6, purple),
				new ColorSequenceKeypoint(0.8, new Color3()),
				new ColorSequenceKeypoint(1, new Color3()),
			]),
			transparency: new NumberSequence(0.3),
			rotation: 45,
		},
	},

	profile: {
		...cardStyle,
		headshot: {
			background: { color: backgroundLight },
			foreground: { color: foreground },
			stroke: { color: gradient, rotation: 30 },
			cornerRadius: new UDim(1, 0),
		},
		sliders: {
			flightspeed: {
				...sliderStyle,
				slider: { color: pink },
				glow: { color: pink, transparency: 0 },
			},
			walkspeed: {
				...sliderStyle,
				slider: { color: purple },
				glow: { color: purple, transparency: 0 },
			},
			jumpheight: {
				...sliderStyle,
				slider: { color: blue },
				glow: { color: blue, transparency: 0 },
			},
		},

		switches: {
			flightspeed: {
				...buttonStyle,
				$active: {
					background: { color: pink },
					foreground: { color: foreground, transparency: 0 },
					dropshadow: { color: pink, transparency: 0 },
				},
			},
			walkspeed: {
				...buttonStyle,
				$active: {
					background: { color: purple },
					foreground: { color: foreground, transparency: 0 },
					dropshadow: { color: purple, transparency: 0 },
				},
			},
			jumpheight: {
				...buttonStyle,
				$active: {
					background: { color: blue },
					foreground: { color: foreground, transparency: 0 },
					dropshadow: { color: blue, transparency: 0 },
				},
			},
			respawn: {
				...buttonStyle,
				$active: {
					background: { color: pink },
					foreground: { color: foreground, transparency: 0 },
					dropshadow: { color: pink, transparency: 0 },
				},
			},
			ghostmode: {
				...buttonStyle,
				$active: {
					background: { color: pink.Lerp(purple, 0.6) },
					foreground: { color: foreground, transparency: 0 },
					dropshadow: { color: pink.Lerp(purple, 0.6), transparency: 0 },
				},
			},
			godmode: {
				...buttonStyle,
				$active: {
					background: { color: purple.Lerp(blue, 0.6) },
					foreground: { color: foreground, transparency: 0 },
					dropshadow: { color: purple.Lerp(blue, 0.6), transparency: 0 },
				},
			},
			freecam: {
				...buttonStyle,
				$active: {
					background: { color: blue },
					foreground: { color: foreground, transparency: 0 },
					dropshadow: { color: blue, transparency: 0 },
				},
			},
		},
	},

	session: cardStyle,

	server: cardStyle,

	games: {
		...cardStyle,
		gameCard: {
			skeleton: {
				from: { color: Color3.fromHex("#282828") },
				to: { color: Color3.fromHex("#383838") },
			},
			dropshadow: { color: dropshadow, transparency: 0.4 },
			cornerRadius,
		},
	},

	players: cardStyle,

	config: cardStyle,

	shortcuts: cardStyle,

	themes: cardStyle,
};
