declare const VERSION: string;

declare const queue_on_teleport: ((script: string) => void) | undefined;

declare const gethui: (() => BasePlayerGui) | undefined;

declare const protect_gui: ((object: ScreenGui) => void) | undefined;

declare namespace syn {
	function queue_on_teleport(script: string): void;
	function protect_gui(object: ScreenGui): void;
}
