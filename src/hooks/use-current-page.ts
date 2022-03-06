import { useAppSelector } from "hooks/common/rodux-hooks";
import { DashboardPage } from "store/models/dashboard.model";

export function useCurrentPage() {
	return useAppSelector((state) => state.dashboard.page);
}

export function useIsPageOpen(page: DashboardPage) {
	return useAppSelector((state) => state.dashboard.isOpen && state.dashboard.page === page);
}
