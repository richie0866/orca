import Rodux from "@rbxts/rodux";
import { OptionsAction } from "store/actions/options.action";
import { OptionsState } from "store/models/options.model";
import { persistentState } from "store/persistent-state";

const initialState: OptionsState = persistentState<OptionsState>("options", (state) => state.options, {
	currentTheme: "Sorbet",
	config: {
		acrylicBlur: true,
	},
	shortcuts: {
		toggleDashboard: Enum.KeyCode.K.Value,
	},
});

export const optionsReducer = Rodux.createReducer<OptionsState, OptionsAction>(initialState, {
	"options/setConfig": (state, action) => {
		return {
			...state,
			config: {
				...state.config,
				[action.name]: action.active,
			},
		};
	},
	"options/setTheme": (state, action) => {
		return {
			...state,
			currentTheme: action.theme,
		};
	},
	"options/setShortcut": (state, action) => {
		return {
			...state,
			shortcuts: {
				...state.shortcuts,
				[action.shortcut]: action.keycode,
			},
		};
	},
	"options/removeShortcut": (state, action) => {
		return {
			...state,
			shortcuts: {
				...state.shortcuts,
				[action.shortcut]: undefined,
			},
		};
	},
});
