import { InferEnumNames } from "@rbxts/roact";

export type KeyCodeValue = InferEnumNames<Enum.KeyCode>;

export interface ShortcutsState extends Record<string, KeyCodeValue | undefined> {
	toggleOrca?: KeyCodeValue;
}
