import { GamesAction } from "./games.action";
import { GamesPage, GamesState } from "./games.model";

const initialState: GamesState = {
	page: GamesPage.GameList,
	currentGame: undefined,
};

export function gamesReducer(state = initialState, action: GamesAction) {
	switch (action.type) {
		case "SET_CURRENT_GAME_PAGE":
			return {
				...state,
				page: action.payload,
			};
		case "SET_CURRENT_GAME":
			return {
				...state,
				currentGame: action.payload,
			};
		default:
			return state;
	}
}
