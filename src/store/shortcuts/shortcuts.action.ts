import Rodux from "@rbxts/rodux";
import { KeyCodeValue } from "./shortcuts.model";

export function setShortcut(
	shortcut: string,
	keyCode: KeyCodeValue,
): Rodux.Action<"SET_SHORTCUT"> & { payload: { shortcut: string; keyCode: KeyCodeValue } } {
	return {
		type: "SET_SHORTCUT",
		payload: {
			shortcut,
			keyCode,
		},
	};
}

export function deleteShortcut(shortcut: string): Rodux.Action<"DELETE_SHORTCUT"> & { payload: string } {
	return {
		type: "DELETE_SHORTCUT",
		payload: shortcut,
	};
}

export type ShortcutsAction = ReturnType<typeof setShortcut> | ReturnType<typeof deleteShortcut>;
