import { Theme } from "../themes.model";

const pink = Color3.fromHex("#C6428E");
const blue = Color3.fromHex("#484fd7");
const purple = Color3.fromHex("#9a3fe5");
const foreground = Color3.fromHex("#fafafa");
const background = Color3.fromHex("#181818");
const dropshadow = Color3.fromHex("#000000");
// const backgroundLight = Color3.fromHex("#242424");

const gradient = new ColorSequence([
	new ColorSequenceKeypoint(0, pink),
	new ColorSequenceKeypoint(0.5, purple),
	new ColorSequenceKeypoint(1, blue),
]);

const cornerRadius = new UDim(0, 8);

export const darkTheme: Theme = {
	name: "Dark theme",

	navbar: {
		accent: { color: gradient },
		background: { color: background },
		foreground: { color: foreground },
		dropshadow: { color: dropshadow, transparency: 0.4 },
		cornerRadius,

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

	clock: {
		background: { color: background },
		foreground: { color: foreground },
		dropshadow: { color: dropshadow, transparency: 0.4 },
		cornerRadius,
	},

	title: {
		background: { color: gradient, rotation: 30 },
		foreground: { color: foreground },
		dropshadow: { color: gradient, rotation: 30 },
		cornerRadius,
	},

	profile: {
		background: { color: background },
		foreground: { color: foreground },
		dropshadow: { color: dropshadow, transparency: 0.4 },
		cornerRadius,
	},

	server: {
		background: { color: background },
		foreground: { color: foreground },
		dropshadow: { color: dropshadow, transparency: 0.4 },
		cornerRadius,
	},

	friends: {
		background: { color: background },
		foreground: { color: foreground },
		dropshadow: { color: dropshadow, transparency: 0.4 },
		cornerRadius,
	},
};
