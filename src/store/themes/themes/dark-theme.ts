import { GradientColor, Theme } from "../themes.model";

const pink = Color3.fromHex("#C6428E");
const blue = Color3.fromHex("#484fd7");
const purple = Color3.fromHex("#9a3fe5");

const background = Color3.fromHex("#181818");
const backgroundLight = Color3.fromHex("#242424");
const foreground = Color3.fromHex("#fafafa");

const gradient: GradientColor = {
	color: new ColorSequence([
		new ColorSequenceKeypoint(0, pink),
		new ColorSequenceKeypoint(0.5, purple),
		new ColorSequenceKeypoint(1, blue),
	]),
};

export const darkTheme: Theme = {
	name: "Dark theme",

	navbar: {
		accent: gradient,
		background: { color: background },
		foreground: { color: foreground },
		dropshadow: { color: background, transparency: 0.4 },
		cornerRadius: new UDim(0, 6),

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
		dropshadow: { color: background, transparency: 0.4 },
		cornerRadius: new UDim(0, 6),
	},
};
