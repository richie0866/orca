declare const VERSION: string;

export const IS_DEV = readfile === undefined;
export const VERSION_TAG = VERSION ?? "studio";

// Folder containing saved Rodux state
export const ORCA_PATH = "orca-2.x";

// Above topbar, below prompts
export const ORCA_DISPLAY_ORDER = 7;

// Padding between cards and margins
export const SCREEN_MARGIN = 48;

// Card size, padding, etc
export const CARD_WIDTH = 330;
export const CARD_HEIGHT_25 = 190;
export const CARD_HEIGHT_50 = 417;
export const CARD_HEIGHT_75 = 642;
export const CARD_MARGIN = 36; // Should not change
export const CARD_INNER_MARGIN = 24;
