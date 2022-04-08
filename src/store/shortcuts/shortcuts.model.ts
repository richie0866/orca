export type KeyCodeValue = number;

export interface ShortcutsState extends Record<string, KeyCodeValue | undefined> {}
