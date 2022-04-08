import { GradientColor, Theme } from "../theme";

const pink = Color3.fromHex("#C6428E");
const blue = Color3.fromHex("#484fd7");
const purple = Color3.fromHex("#9a3fe5");

const black = Color3.fromHex("#181818");
const lightBlack = Color3.fromHex("#242424");
const white = Color3.fromHex("#fafafa");

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
		background: { color: black },
		foreground: { color: white },
		dropshadow: { color: black },
	},
};
