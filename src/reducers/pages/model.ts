export interface PagesState {
	currentPage: Page;
	visible: boolean;
}

export enum Page {
	Home = "Home",
	Apps = "Apps",
	Scripts = "Scripts",
	Settings = "Settings",
}

export const pageIcons: Record<Page, string> = {
	Home: "rbxassetid://8992031167",
	Apps: "rbxassetid://8992031246",
	Scripts: "rbxassetid://8992030918",
	Settings: "rbxassetid://8992031056",
};

export const pageNumbers: Record<Page, number> = {
	Home: 0,
	Apps: 1,
	Scripts: 2,
	Settings: 3,
};
