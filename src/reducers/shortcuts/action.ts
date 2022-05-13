import { KeyCodeValue } from "./model";

export function setShortcut(shortcut: string, keyCode: KeyCodeValue) {
	return {
		type: "SET_SHORTCUT",
		shortcut,
		keyCode,
	} as const;
}

export function deleteShortcut(shortcut: string) {
	return {
		type: "DELETE_SHORTCUT",
		shortcut,
	} as const;
}

export type ShortcutsAction = ReturnType<typeof setShortcut> | ReturnType<typeof deleteShortcut>;
