import Rodux from "@rbxts/rodux";
import { DashboardAction } from "../actions/dashboard.action";
import { DashboardPage, DashboardState } from "../models/dashboard.model";

const initialState: DashboardState = {
	page: DashboardPage.Home,
	isOpen: false,
	hint: undefined,
	apps: {
		playerSelected: undefined,
	},
};

export const dashboardReducer = Rodux.createReducer<DashboardState, DashboardAction>(initialState, {
	"dashboard/setDashboardPage": (state, action) => {
		return {
			...state,
			page: action.page,
		};
	},
	"dashboard/toggleDashboard": (state) => {
		return {
			...state,
			isOpen: !state.isOpen,
		};
	},
	"dashboard/setHint": (state, action) => {
		return {
			...state,
			hint: action.hint,
		};
	},
	"dashboard/clearHint": (state) => {
		return {
			...state,
			hint: undefined,
		};
	},
	"dashboard/playerSelected": (state, action) => {
		return {
			...state,
			apps: {
				...state.apps,
				playerSelected: action.name,
			},
		};
	},
	"dashboard/playerDeselected": (state) => {
		return {
			...state,
			apps: {
				...state.apps,
				playerSelected: undefined,
			},
		};
	},
});
