import { GamesAction } from "./action";
import { GamesPage, GamesState } from "./model";

const initialState: GamesState = {
	page: GamesPage.GameList,
	currentGame: undefined,
};

export default function gamesReducer(state = initialState, action: GamesAction) {
	switch (action.type) {
		case "SET_CURRENT_GAME_PAGE":
			return {
				...state,
				page: action.page,
			};
		case "SET_CURRENT_GAME":
			return {
				...state,
				currentGame: action.info,
			};
		default:
			return state;
	}
}
