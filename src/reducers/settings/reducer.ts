import { SettingsAction } from "./action";
import { SettingsState } from "./model";

export const initialState: SettingsState = {
	backgroundBlur: false,
};

export default function settingsReducer(state = initialState, action: SettingsAction): SettingsState {
	switch (action.type) {
		case "SET_BACKGROUND_BLUR":
			return { ...state, backgroundBlur: action.enabled };
		default:
			return state;
	}
}
