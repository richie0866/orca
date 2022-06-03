export const VERSION_TAG = VERSION ?? "studio";
export const IS_LOADED = "__ORCA_IS_LOADED__";
export const DATA_DIRECTORY = "orca-2.x";

export const IS_RUNNING = game.GetService("RunService").IsRunning();
export const IS_ELEVATED = loadstring !== undefined;
export const HAS_FILE_ACCESS = readfile !== undefined;
