export interface Job {
	active: boolean;
}

export interface JobWithValue<T> extends Job {
	value: T;
}

export type InferJobValue<T> = T extends JobWithValue<infer V> ? V : never;

export type JobsWithValue<T> = ExcludeMembers<
	{
		[K in keyof JobsState]: JobsState[K] extends JobWithValue<T> ? JobsState[K] : never;
	},
	never
>;

export type JobsState = {
	flight: JobWithValue<number>;
	walkSpeed: JobWithValue<number>;
	jumpHeight: JobWithValue<number>;

	refresh: Job;
	ghost: Job;
	godmode: Job;
	freecam: Job;

	teleport: Job;
	hide: Job;
	kill: Job;
	spectate: Job;

	rejoinServer: Job;
	switchServer: Job;
};
