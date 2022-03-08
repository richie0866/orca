import Rodux from "@rbxts/rodux";
import { dashboardReducer } from "store/reducers/dashboard.reducer";
import { jobsReducer } from "store/reducers/jobs.reducer";
import { optionsReducer } from "store/reducers/options.reducer";

export type RootReducer = typeof rootReducer;
export type RootStore = Rodux.Store<RootState, Rodux.Action>;
export type RootState = ReturnType<RootReducer>;

const rootReducer = Rodux.combineReducers({
	dashboard: dashboardReducer,
	jobs: jobsReducer,
	options: optionsReducer,
});

export function configureStore(initialState?: Partial<RootState>) {
	return new Rodux.Store(rootReducer, initialState);
}
