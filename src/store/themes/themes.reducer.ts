import { ThemesAction } from "./themes.action";
import { ThemesState } from "./themes.model";

const initialState: ThemesState = {
	currentTheme: "Dark theme",
};

export function themesReducer(state = initialState, action: ThemesAction) {
	switch (action.type) {
		case "SET_CURRENT_THEME":
			return { ...state, currentTheme: action.payload };
		default:
			return state;
	}
}
