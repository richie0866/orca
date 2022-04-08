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

export type PagesAction = ReturnType<typeof setCurrentPage> | ReturnType<typeof togglePagesVisible>;
