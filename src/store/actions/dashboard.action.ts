import Rodux from "@rbxts/rodux";
import { DashboardPage } from "../models/dashboard.model";

export type DashboardAction =
	| Rodux.InferActionFromCreator<typeof setDashboardPage>
	| Rodux.InferActionFromCreator<typeof toggleDashboard>
	| Rodux.InferActionFromCreator<typeof setHint>
	| Rodux.InferActionFromCreator<typeof clearHint>
	| Rodux.InferActionFromCreator<typeof playerSelected>
	| Rodux.InferActionFromCreator<typeof playerDeselected>;

export const setDashboardPage = Rodux.makeActionCreator("dashboard/setDashboardPage", (page: DashboardPage) => ({
	page,
}));

export const toggleDashboard = Rodux.makeActionCreator("dashboard/toggleDashboard", () => ({}));

export const setHint = Rodux.makeActionCreator("dashboard/setHint", (hint: string) => ({
	hint,
}));

export const clearHint = Rodux.makeActionCreator("dashboard/clearHint", () => ({}));

export const playerSelected = Rodux.makeActionCreator("dashboard/playerSelected", (player: Player) => ({
	name: player.Name,
}));

export const playerDeselected = Rodux.makeActionCreator("dashboard/playerDeselected", () => ({}));
