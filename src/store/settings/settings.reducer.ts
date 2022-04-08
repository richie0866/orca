import { SettingsAction } from "./settings.action";
import { SettingsState } from "./settings.model";

export const initialState: SettingsState = {
	backgroundBlur: false,
};

export function settingsReducer(state = initialState, action: SettingsAction): SettingsState {
	switch (action.type) {
		case "SET_BACKGROUND_BLUR":
			return { ...state, backgroundBlur: action.payload };
		default:
			return state;
	}
}
