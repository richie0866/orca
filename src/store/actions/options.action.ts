import Rodux from "@rbxts/rodux";
import { OptionsState } from "store/models/options.model";

export type OptionsAction =
	| Rodux.InferActionFromCreator<typeof setConfig>
	| Rodux.InferActionFromCreator<typeof setShortcut>
	| Rodux.InferActionFromCreator<typeof removeShortcut>
	| Rodux.InferActionFromCreator<typeof setTheme>;

export const setConfig = Rodux.makeActionCreator(
	"options/setConfig",
	(name: keyof OptionsState["config"], active: boolean) => ({
		name,
		active,
	}),
);

export const setShortcut = Rodux.makeActionCreator("options/setShortcut", (shortcut: string, keycode: number) => ({
	shortcut,
	keycode,
}));

export const removeShortcut = Rodux.makeActionCreator("options/removeShortcut", (shortcut: string) => ({
	shortcut,
}));

export const setTheme = Rodux.makeActionCreator("options/setTheme", (theme: string) => ({ theme }));
