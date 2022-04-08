/// <reference types="@rbxts/types/plugin"/>

// Internal

declare const VERSION: string;

// RobloxScriptSecurity

interface DataModel {
	/**
	 * Sends a HTTP GET request to the given URL and returns the response body.
	 *
	 * Tags: Yields, RobloxScriptSecurity
	 */
	HttpGetAsync(
		this: DataModel,
		url: string,
		httpRequestType?: Enum.HttpRequestType,
	): LuaTuple<[data: string, code: number]>;
	/**
	 * The HttpPostAsync function performs a POST request to the specified url, using the specified data, and the specified contentType.
	 *
	 * Tags: Yields, RobloxScriptSecurity
	 */
	HttpPostAsync(
		this: DataModel,
		url: string,
		data: string,
		contentType?: string,
		httpRequestType?: Enum.HttpRequestType,
	): string;
}

// External

declare const readfile: (path: string) => string | undefined;
declare const writefile: (path: string, data: string) => string | undefined;
declare const makefolder: (path: string) => void;
declare const isfile: (path: string) => boolean;
declare const isfolder: (path: string) => boolean;

declare const getgenv: (() => Record<string, unknown>) | undefined;
declare const queue_on_teleport: ((script: string) => void) | undefined;
declare const gethui: (() => BasePlayerGui) | undefined;
declare const protect_gui: ((object: ScreenGui) => void) | undefined;

declare namespace syn {
	function queue_on_teleport(script: string): void;
	function protect_gui(object: ScreenGui): void;
}
