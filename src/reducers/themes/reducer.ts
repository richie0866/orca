import { ThemesAction } from "./action";
import { ThemesState } from "./model";

const initialState: ThemesState = {
	currentTheme: "Dark theme",
};

export default function themesReducer(state = initialState, action: ThemesAction) {
	switch (action.type) {
		case "SET_CURRENT_THEME":
			return { ...state, currentTheme: action.theme };
		default:
			return state;
	}
}
