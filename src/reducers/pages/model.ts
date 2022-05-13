export interface PagesState {
	currentPage: Page;
	visible: boolean;
}

export enum Page {
	Home,
	Apps,
	Scripts,
	Settings,
}

export const pageIcons: Record<Page, string> = [
	"rbxassetid://8992031167",
	"rbxassetid://8992031246",
	"rbxassetid://8992030918",
	"rbxassetid://8992031056",
];
