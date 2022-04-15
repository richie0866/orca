import { SCREEN_MARGIN } from "constants";
import { map } from "./number-util";

// Minimum/maximum screen height that will cause the padding to decrease. Avoids
// rescaling the UI for as long as possible.
export const PADDING_MIN_HEIGHT = 980;
export const PADDING_MAX_HEIGHT = 1080;

// Minimum/maximum padding to apply to the UI.
export const MIN_PADDING_Y = 14;
export const MAX_PADDING_Y = SCREEN_MARGIN;

export function getMargin(size: Vector2) {
	const y = size.Y;

	if (y < PADDING_MAX_HEIGHT && y >= PADDING_MIN_HEIGHT) {
		return map(y, PADDING_MIN_HEIGHT, PADDING_MAX_HEIGHT, MIN_PADDING_Y, MAX_PADDING_Y);
	} else if (y < PADDING_MIN_HEIGHT) {
		return MIN_PADDING_Y;
	} else {
		return MAX_PADDING_Y;
	}
}

export function getScale(size: Vector2) {
	const y = size.Y;

	if (y < PADDING_MIN_HEIGHT) {
		return map(y, PADDING_MIN_HEIGHT, 130, 1, 0);
	} else {
		return 1;
	}
}
