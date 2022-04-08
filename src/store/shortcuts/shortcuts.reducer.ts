import { ShortcutsAction } from "./shortcuts.action";
import { ShortcutsState } from "./shortcuts.model";

export const initialState: ShortcutsState = {};

export function shortcutsReducer(state = initialState, action: ShortcutsAction) {
	switch (action.type) {
		case "SET_SHORTCUT":
			return { ...state, [action.payload.shortcut]: action.payload.keyCode };
		case "DELETE_SHORTCUT":
			return { ...state, [action.payload]: undefined };
		default:
			return state;
	}
}
