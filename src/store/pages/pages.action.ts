import Rodux from "@rbxts/rodux";
import { Page } from "./pages.model";

export function setCurrentPage(page: Page): Rodux.Action<"SET_CURRENT_PAGE"> & { payload: Page } {
	return {
		type: "SET_CURRENT_PAGE",
		payload: page,
	};
}

export function togglePagesVisible(): Rodux.Action<"TOGGLE_PAGES_VISIBLE"> {
	return {
		type: "TOGGLE_PAGES_VISIBLE",
	};
}

export function setPagesVisible(visible: boolean): Rodux.Action<"SET_PAGES_VISIBLE"> & { payload: boolean } {
	return {
		type: "SET_PAGES_VISIBLE",
		payload: visible,
	};
}

export type PagesAction =
	| ReturnType<typeof setCurrentPage>
	| ReturnType<typeof togglePagesVisible>
	| ReturnType<typeof setPagesVisible>;
