import { ShortcutsAction } from "./action";
import { ShortcutsState } from "./model";

export const initialState: ShortcutsState = {
	toggleOrca: "K",
};

export default function shortcutsReducer(state = initialState, action: ShortcutsAction) {
	switch (action.type) {
		case "SET_SHORTCUT":
			return { ...state, [action.shortcut]: action.keyCode };
		case "DELETE_SHORTCUT":
			return { ...state, [action.shortcut]: undefined };
		default:
			return state;
	}
}
