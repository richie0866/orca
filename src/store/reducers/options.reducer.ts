import Rodux from "@rbxts/rodux";
import { OptionsAction } from "store/actions/options.action";
import { OptionsState } from "store/models/options.model";

const initialState: OptionsState = {
	acrylicBlurEnabled: true,
};

export const optionsReducer = Rodux.createReducer<OptionsState, OptionsAction>(initialState, {
	"options/setAcrylicBlurEnabled": (state, action) => {
		return {
			...state,
			acrylicBlurEnabled: action.active,
		};
	},
});
