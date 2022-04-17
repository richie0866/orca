import { ProfileAction } from "./profile.action";
import { ProfileState } from "./profile.model";

const initialState: ProfileState = {
	sliders: {
		flightspeed: { value: 50, enabled: false },
		walkspeed: { value: 50, enabled: false },
		jumpheight: { value: 150, enabled: false },
	},
	switches: {
		respawn: { enabled: false },
		ghostmode: { enabled: false },
		godmode: { enabled: false },
		freecam: { enabled: false },
	},
};

export function profileReducer(state = initialState, action: ProfileAction): ProfileState {
	switch (action.type) {
		case "UPDATE_PROFILE_SLIDER":
			return {
				...state,
				sliders: {
					...state.sliders,
					[action.payload.key]: {
						...state.sliders[action.payload.key],
						value: action.payload.value,
					},
				},
			};
		case "TOGGLE_PROFILE_SLIDER":
			return {
				...state,
				sliders: {
					...state.sliders,
					[action.payload.key]: {
						...state.sliders[action.payload.key],
						enabled: action.payload.enabled,
					},
				},
			};
		case "TOGGLE_PROFILE_SWITCH":
			return {
				...state,
				switches: {
					...state.switches,
					[action.payload.key]: {
						...state.switches[action.payload.key],
						enabled: action.payload.enabled,
					},
				},
			};
		default:
			return state;
	}
}
