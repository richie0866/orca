import { Page, PagesState } from "./pages.model";
import { PagesAction } from "./pages.action";

const initialState: PagesState = {
	currentPage: Page.Home,
	visible: true,
};

export function pagesReducer(state = initialState, action: PagesAction) {
	switch (action.type) {
		case "SET_CURRENT_PAGE":
			return { ...state, currentPage: action.payload };
		case "TOGGLE_PAGES_VISIBLE":
			return { ...state, visible: !state.visible };
		default:
			return state;
	}
}
