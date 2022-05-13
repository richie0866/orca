import { GameActivity } from "hooks/use-friends";
import { GamesPage } from "./model";

export function setCurrentGamePage(page: GamesPage) {
	return {
		type: "SET_CURRENT_GAME_PAGE",
		page,
	} as const;
}

export function setCurrentGame(info: GameActivity) {
	return {
		type: "SET_CURRENT_GAME",
		info,
	} as const;
}

export type GamesAction = ReturnType<typeof setCurrentGamePage> | ReturnType<typeof setCurrentGame>;
