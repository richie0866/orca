import { GameActivity } from "hooks/use-friends";

export enum GamesPage {
	GameList,
	GamePreview,
}

export interface GamesState {
	page: GamesPage;
	currentGame?: GameActivity;
}
