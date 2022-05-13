import { Page } from "./model";

export function setCurrentPage(page: Page) {
	return {
		type: "SET_CURRENT_PAGE",
		page,
	} as const;
}

export function togglePagesVisible() {
	return {
		type: "TOGGLE_PAGES_VISIBLE",
	} as const;
}

export function setPagesVisible(visible: boolean) {
	return {
		type: "SET_PAGES_VISIBLE",
		visible,
	} as const;
}

export type PagesAction =
	| ReturnType<typeof setCurrentPage>
	| ReturnType<typeof togglePagesVisible>
	| ReturnType<typeof setPagesVisible>;
