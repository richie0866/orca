import Rodux from "@rbxts/rodux";
import { JobsAction } from "store/actions/jobs.action";
import { JobsState } from "../models/jobs.model";

const initialState: JobsState = {
	flight: { value: 60, active: false },
	walkSpeed: { value: 80, active: false },
	jumpHeight: { value: 200, active: false },

	refresh: { active: false },
	ghost: { active: false },
	godmode: { active: false },
	freecam: { active: false },

	teleport: { active: false },
	hide: { active: false },
	kill: { active: false },
	spectate: { active: false },

	rejoinServer: { active: false },
	switchServer: { active: false },
};

export const jobsReducer = Rodux.createReducer<JobsState, JobsAction>(initialState, {
	"jobs/setJobActive": (state, action) => {
		return {
			...state,
			[action.jobName]: {
				...state[action.jobName],
				active: action.active,
			},
		};
	},
	"jobs/setJobValue": (state, action) => {
		return {
			...state,
			[action.jobName]: {
				...state[action.jobName],
				value: action.value,
			},
		};
	},
});
