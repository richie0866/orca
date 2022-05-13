import { Page, createPageOpenSelector, selectPagesVisible } from "reducers/pages";
import { useMemo } from "@rbxts/roact-hooked";
import { useRootSelector } from "./use-root-store";

export function usePageOpen(page?: keyof typeof Page): boolean {
	const selector = useMemo(() => (page ? createPageOpenSelector(page) : selectPagesVisible), [page]);

	return useRootSelector(selector);
}

export function usePagesVisible(): boolean {
	return useRootSelector(selectPagesVisible);
}
