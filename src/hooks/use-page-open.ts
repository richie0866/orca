import { Page } from "store/pages";
import { useRootSelector } from "./use-root-store";

export function usePageOpen(page?: keyof typeof Page): boolean {
	return page
		? useRootSelector((state) => state.pages.currentPage === Page[page] && state.pages.visible)
		: useRootSelector((state) => state.pages.visible);
}
