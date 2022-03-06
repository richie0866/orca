import Rodux from "@rbxts/rodux";
import { InferJobValue, JobsState } from "store/models/jobs.model";

export type JobsAction =
	| Rodux.InferActionFromCreator<typeof setJobActive>
	| Rodux.InferActionFromCreator<typeof setJobValue>;

export const setJobActive = Rodux.makeActionCreator(
	"jobs/setJobActive",
	(jobName: keyof JobsState, active: boolean) => ({
		jobName,
		active,
	}),
);

export const setJobValue = Rodux.makeActionCreator(
	"jobs/setJobValue",
	<K extends keyof JobsState>(jobName: K, value: InferJobValue<JobsState[K]>) => ({
		jobName,
		value,
	}),
);
