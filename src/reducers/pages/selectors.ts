import { createSelector } from "@rbxts/roselect";

import { Page } from "./model";
import { RootState } from "reducers";

export const selectPagesVisible = (state: RootState) => state.pages.visible;
export const selectCurrentPage = (state: RootState) => state.pages.currentPage;

export const createPageOpenSelector = (pageName: keyof typeof Page) =>
	createSelector(
		[selectPagesVisible, selectCurrentPage],
		(visible, currentPage) => visible && currentPage === Page[pageName],
	);
