import Rodux from "@rbxts/rodux";
import { sorbet } from "themes/sorbet";
import { ThemeAction } from "../actions/theme.action";
import { ThemeState } from "../models/theme.model";

const initialState: ThemeState = {
	current: sorbet,
};

export const themeReducer = Rodux.createReducer<ThemeState, ThemeAction>(initialState, {
	"theme/setTheme": (state, action) => {
		return {
			...state,
			current: action.theme,
		};
	},
});
