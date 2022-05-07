import Rodux from "@rbxts/rodux";
import { GameActivity } from "hooks/use-friends";
import { GamesPage } from "./games.model";

export function setCurrentGamePage(page: GamesPage): Rodux.Action<"SET_CURRENT_GAME_PAGE"> & { payload: GamesPage } {
	return {
		type: "SET_CURRENT_GAME_PAGE",
		payload: page,
	};
}

export function setCurrentGame(info: GameActivity): Rodux.Action<"SET_CURRENT_GAME"> & { payload: GameActivity } {
	return {
		type: "SET_CURRENT_GAME",
		payload: info,
	};
}

export type GamesAction = ReturnType<typeof setCurrentGamePage> | ReturnType<typeof setCurrentGame>;
