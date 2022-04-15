import { SCREEN_MARGIN } from "constants";

export const MIN_WIDTH = 56;
export const MAX_WIDTH = 200;
export const HEIGHT = 56;
export const PADDING = 14;

export const POSITION_OPENED = new UDim2(0, SCREEN_MARGIN, 1, 0);
export const POSITION_CLOSED = new UDim2(0, SCREEN_MARGIN, 1, HEIGHT + SCREEN_MARGIN * 2);
