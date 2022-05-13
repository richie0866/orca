import { RunService } from "@rbxts/services";

import { Page, PagesState } from "./model";
import { PagesAction } from "./action";

const initialState: PagesState = {
	currentPage: Page.Home,
	visible: !RunService.IsRunning(),
};

export default function pagesReducer(state = initialState, action: PagesAction) {
	switch (action.type) {
		case "SET_CURRENT_PAGE":
			return { ...state, currentPage: action.page };
		case "TOGGLE_PAGES_VISIBLE":
			return { ...state, visible: !state.visible };
		case "SET_PAGES_VISIBLE":
			return { ...state, visible: action.visible };
		default:
			return state;
	}
}
